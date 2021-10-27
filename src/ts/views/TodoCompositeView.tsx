/*
* TodoCompositeView.tsx
* Copyright: Microsoft 2018
*
* Main view that provides a composite view of todos on the left and
* details of the selected todo on the right.
*/

import * as RX from 'reactxp';
import { ComponentBase } from 'resub';

import NavContextStore from '../stores/NavContextStore';
import * as NavModels from '../models/NavModels';
import CreateTodoPanel from './CreateTodoPanel';
import TodoListPanel from './TodoListPanel';
import ViewTodoPanel from './ViewTodoPanel';
import { HomeHook } from './HomeHook';
import CurrentUserStore from '../stores/CurrentUserStore';

import { Option } from '../models/TodoModels';
import TodosStore from '../stores/TodosStore';
export interface TodoCompositeViewProps extends RX.CommonProps {
    navContext: NavModels.TodoRootNavContext;
    isTiny: boolean;
}

interface TodoCompositeViewState {
    isLogin: boolean;
    transactionEth: number;
    pollOptions: Option[];
    transactionBsc: number;
    transactionMatic: number;
    cargando: boolean;
}

const _styles = {
    viewContainer: RX.Styles.createViewStyle({
        flex: 1,
        alignSelf: 'stretch',
        flexDirection: 'row',
    }),
    leftPanelContainer: RX.Styles.createViewStyle({
        width: 400,
        flexDirection: 'column',
    }),
    rightPanelContainer: RX.Styles.createViewStyle({
        flex: 1,
        flexDirection: 'column',
    }),
};

export default class TodoCompositeView extends ComponentBase<TodoCompositeViewProps, TodoCompositeViewState> {
    protected _buildState(props: TodoCompositeViewProps, initState: boolean): Partial<TodoCompositeViewState> | undefined {
        const newState: Partial<TodoCompositeViewState> = {
            isLogin: CurrentUserStore.getLogin(),
            transactionEth: CurrentUserStore.getEThTransaction(),
            transactionBsc: CurrentUserStore.getBscTransaction(),
            transactionMatic: CurrentUserStore.getMaticTransaction(),
            cargando: CurrentUserStore.getCargando(),
            pollOptions: TodosStore.getOptions()
        };

        return newState;
    }

    render(): JSX.Element | null {
        return (
            <RX.View style={_styles.viewContainer}>
                {this.state.isLogin ?
                    <RX.View style={_styles.leftPanelContainer}>
                        <TodoListPanel isTiny={this.props.isTiny}
                            selectedTodoId={this.props.navContext.todoList.selectedTodoId || ''}
                            onSelect={this._onSelectTodo}
                            onCreateNew={this._onCreateNewTodo}
                        />
                    </RX.View> : null}
                <RX.View style={_styles.rightPanelContainer}>
                    {this._renderRightPanel()}
                </RX.View>
            </RX.View>
        );
    }

    private _renderRightPanel() {
        if (this.props.navContext.showNewTodoPanel) {
            return (
                <CreateTodoPanel isTiny={this.props.isTiny} pollOptions={this.state.pollOptions} isLogin={this.state.isLogin} />
            );
        } else if (this.props.navContext.todoList.selectedTodoId) {
            return (
                <ViewTodoPanel isTiny={this.props.isTiny} options={this.state.pollOptions} todoId={this.props.navContext.todoList.selectedTodoId} />
            );
        } else if (this.props.navContext.showHomePanel) {
            return (
                <HomeHook isTiny={this.props.isTiny} cargando={this.state.cargando} isLogin={this.state.isLogin} transactionEth={this.state ? this.state.transactionEth : 0} transactionBsc={this.state ? this.state.transactionBsc : 0} transactionMatic={this.state ? this.state.transactionMatic : 0} />
            );
        } else {
            return <HomeHook isTiny={this.props.isTiny} cargando={this.state.cargando} isLogin={this.state.isLogin} transactionEth={this.state ? this.state.transactionEth : 0} transactionBsc={this.state ? this.state.transactionBsc : 0} transactionMatic={this.state ? this.state.transactionMatic : 0} />;
        }
    }

    private _onSelectTodo = (todoId: string) => {
        NavContextStore.navigateToTodoList(todoId, false);
    };

    private _onCreateNewTodo = async () => {
        await TodosStore.setOptions([])
        NavContextStore.navigateToTodoList('', true);
    };
}
