/*
* RootView.tsx
* Copyright: Microsoft 2018
*
* Top-level UI for the TodoList sample app.
*/

import ImageSource from 'modules/images';
import * as assert from 'assert';

import * as _ from 'lodash';
import * as RX from 'reactxp';
import Navigator, { Types as NavTypes } from 'reactxp-navigation';
import { ComponentBase } from 'resub';

import NavContextStore from '../stores/NavContextStore';
import * as NavModels from '../models/NavModels';
import { Colors } from '../app/Styles';

import { Option } from '../models/TodoModels';
import CreateTodoPanel from './CreateTodoPanel';
import TodoCompositeView from './TodoCompositeView';
import TodoListPanel from './TodoListPanel';
import TopBarComposite from './TopBarComposite';
import TopBarStack from './TopBarStack';
import ViewTodoPanel from './ViewTodoPanel';
import ResponsiveWidthStore from '../stores/ResponsiveWidthStore';
import { HomeHook } from './HomeHook';
import CurrentUserStore from '../stores/CurrentUserStore';
import TodosStore from '../stores/TodosStore';

interface RootViewProps extends RX.CommonProps {
    onLayout?: (e: RX.Types.ViewOnLayoutEvent) => void;
}

interface RootViewState {
    isLogin: boolean;
    transactionEth: number;
    transactionBsc: number;
    cargando: boolean;
    transactionMatic: number;
    pollOptions: Option[];
    viewTitle: string;
    isTiny: boolean;
    height: number;
    width: number;
    navContext: NavModels.RootNavContext;
}

const _styles = {
    root: RX.Styles.createViewStyle({
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: Colors.contentBackground,
    }),
    stackViewBackground: RX.Styles.createViewStyle({
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: Colors.contentBackground,
    }),
};

export default class RootView extends ComponentBase<RootViewProps, RootViewState> {
    private _navigator: Navigator | null = null;

    protected _buildState(props: RootViewProps, initState: boolean): Partial<RootViewState> | undefined {
        const newNavContext = NavContextStore.getNavContext();

        const partialState: Partial<RootViewState> = {
            viewTitle: this._getViewTitle(newNavContext),
            navContext: newNavContext,
            cargando: CurrentUserStore.getCargando(),
            isLogin: CurrentUserStore.getLogin(),
            transactionEth: CurrentUserStore.getEThTransaction(),
            transactionBsc: CurrentUserStore.getBscTransaction(),
            transactionMatic: CurrentUserStore.getMaticTransaction(),
            height: ResponsiveWidthStore.getHeight(),
            width: ResponsiveWidthStore.getWidth(),
            pollOptions: TodosStore.getOptions(),
            isTiny: ResponsiveWidthStore.isSmallOrTinyScreenSize()
        };

        if (newNavContext.isStackNav) {
            if (this._navigator) {
                const newNavStack = newNavContext as NavModels.StackRootNavContext;
                let mustResetRouteStack = true;

                if (this.state.navContext && this.state.navContext.isStackNav) {
                    const prevNavStack = this.state.navContext as NavModels.StackRootNavContext;

                    if (newNavStack.stack.length === prevNavStack.stack.length + 1) {
                        if (this._compareNavStack(newNavStack.stack, prevNavStack.stack, prevNavStack.stack.length)) {
                            this._navigator.push(this._createNavigatorRoute(newNavStack.stack[newNavStack.stack.length - 1].viewId));
                            mustResetRouteStack = false;
                        }
                    } else if (newNavStack.stack.length === prevNavStack.stack.length - 1) {
                        if (this._compareNavStack(newNavStack.stack, prevNavStack.stack, newNavStack.stack.length)) {
                            this._navigator.pop();
                            mustResetRouteStack = false;
                        }
                    }
                }

                if (mustResetRouteStack) {
                    this._navigator.immediatelyResetRouteStack(this._createNavigatorRouteStack(newNavStack));
                }
            }
        }

        return partialState;
    }

    render(): JSX.Element | null {
        if (this.state.navContext.isStackNav) {
            return (
                <RX.View style={_styles.root} onLayout={this.props.onLayout}>
                    <RX.Image style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: this.state.width, height: this.state.height }} resizeMethod={'scale'} resizeMode={'cover'} source={ImageSource.colorsBack}>

                        <Navigator
                            ref={this._onMountNavigator}
                            renderScene={this._onRenderScene}
                        />  </RX.Image>
                </RX.View>
            );
        } else {
            const compositeContext = this.state.navContext as NavModels.CompositeRootNavContext;
            const showBackButton = this._showBackButton(compositeContext.viewId);
            return (
                <RX.View style={_styles.root} onLayout={this.props.onLayout}>
                    <RX.Image style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: this.state.width, height: this.state.height }} resizeMethod={'scale'} resizeMode={'cover'} source={ImageSource.colorsBack}>
                        <TopBarComposite showBackButton={showBackButton} onBack={this._onBack} />
                        {this._renderMainView()}
                    </RX.Image>
                </RX.View >
            );
        }
    }

    private _showBackButton(viewId: NavModels.NavViewId): boolean {
        return viewId !== NavModels.NavViewId.TodoComposite &&
            viewId !== NavModels.NavViewId.TodoList;
    }

    private _getViewTitle(navContext: NavModels.RootNavContext): string {
        if (navContext.isStackNav) {
            const stackContext = navContext as NavModels.StackRootNavContext;
            const topViewId = stackContext.stack[stackContext.stack.length - 1].viewId;

            switch (topViewId) {
                case NavModels.NavViewId.TodoList:
                    return 'All Polls';

                case NavModels.NavViewId.NewTodo:
                    return 'New Poll';

                case NavModels.NavViewId.ViewTodo:
                    return 'Poll';
                case NavModels.NavViewId.Home:
                    return 'Welcome';
                default:
                    assert.fail('Unknown view');
                    return '';
            }
        } else {
            return '';
        }
    }

    private _onMountNavigator = (elem: any) => {
        this._navigator = elem;

        if (this._navigator) {
            this._navigator.immediatelyResetRouteStack(this._createNavigatorRouteStack(
                this.state.navContext as NavModels.StackRootNavContext));
        }
    };

    private _onRenderScene = (navigatorRoute: NavTypes.NavigatorRoute): JSX.Element | null => {
        const viewId = navigatorRoute.routeId as NavModels.NavViewId;
        const showBackButton = this._showBackButton(viewId);

        return (
            <RX.View style={_styles.stackViewBackground}>
                <TopBarStack

                    isTiny={this.state.isTiny}
                    title={this.state.viewTitle}
                    showBackButton={showBackButton}
                    onBack={this._onBack}
                />
                {this._renderSceneContents(viewId)}
            </RX.View>
        );
    };

    private _renderSceneContents(viewId: NavModels.NavViewId) {
        switch (viewId) {
            case NavModels.NavViewId.TodoList:
                return (
                    <TodoListPanel
                        isTiny={this.state.isTiny}
                        onSelect={this._onSelectTodoFromList}
                        onCreateNew={this._onCreateNewTodo}
                    />
                );

            case NavModels.NavViewId.NewTodo:
                return <CreateTodoPanel isTiny={this.state.isTiny} pollOptions={this.state.pollOptions} isLogin={this.state.isLogin} />;
            case NavModels.NavViewId.Home:
                return <HomeHook isTiny={this.state.isTiny} cargando={this.state.cargando} isLogin={this.state ? this.state.isLogin : false} transactionEth={this.state ? this.state.transactionEth : 0} transactionBsc={this.state ? this.state.transactionBsc : 0} transactionMatic={this.state ? this.state.transactionMatic : 0} />;

            case NavModels.NavViewId.ViewTodo:
                const viewContext = this._findNavContextForRoute(viewId) as NavModels.ViewTodoViewNavContext;
                if (!viewContext) {
                    return null;
                }
                return <ViewTodoPanel isTiny={this.state.isTiny} options={this.state.pollOptions} todoId={viewContext.todoId} />;

            default:
                return <HomeHook isTiny={this.state.isTiny} cargando={this.state.cargando} isLogin={this.state ? this.state.isLogin : false} transactionEth={this.state ? this.state.transactionEth : 0} transactionBsc={this.state ? this.state.transactionBsc : 0} transactionMatic={this.state ? this.state.transactionMatic : 0} />;;
        }
    }

    private _onSelectTodoFromList = (selectedId: string) => {
        NavContextStore.navigateToTodoList(selectedId, false);
    };

    private _onCreateNewTodo = async () => {
        await TodosStore.setOptions([])
        NavContextStore.navigateToTodoList(undefined, true);
    };

    private _onBack = () => {
        if (this.state.navContext.isStackNav) {
            NavContextStore.popNavigationStack();
        }
    };

    private _renderMainView(): JSX.Element | null {
        if (this.state.navContext instanceof NavModels.TodoRootNavContext) {
            return <TodoCompositeView isTiny={this.state.isTiny} navContext={this.state.navContext} />;
        } else {
            assert.fail('Unexpected main view type');
            return null;
        }
    }

    private _createNavigatorRouteStack(stackContext: NavModels.StackRootNavContext): NavTypes.NavigatorRoute[] {
        return _.map(stackContext.stack, (viewContext, index) => this._createNavigatorRoute(viewContext.viewId));
    }

    private _createNavigatorRoute(viewId: NavModels.NavViewId): NavTypes.NavigatorRoute {
        return {
            routeId: viewId,
            sceneConfigType: NavTypes.NavigatorSceneConfigType.FloatFromRight,
        };
    }

    private _findNavContextForRoute(routeId: number) {
        assert.ok(this.state.navContext.isStackNav);

        const stackContext = this.state.navContext as NavModels.StackRootNavContext;
        return _.find(stackContext.stack, (viewContext: NavModels.ViewNavContext) => viewContext.viewId === routeId);
    }

    private _compareNavStack(stackA: NavModels.ViewNavContext[], stackB: NavModels.ViewNavContext[], count: number): boolean {
        for (let i = 0; i < count; i++) {
            if (stackA[i].viewId !== stackB[i].viewId) {
                return false;
            }
        }

        return true;
    }
}
