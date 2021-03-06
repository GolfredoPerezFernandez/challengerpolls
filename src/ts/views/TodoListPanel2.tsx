/**
* TodoListPanel.tsx
* Copyright: Microsoft 2018
*
* Display first screen of the Todo application.
*/

import * as _ from 'lodash';
import * as RX from 'reactxp';
import { VirtualListView, VirtualListViewItemInfo } from 'reactxp-virtuallistview';
import { VirtualListCellRenderDetails } from 'reactxp-virtuallistview/dist/VirtualListCell';
import { ComponentBase } from 'resub';
import { Colors, Fonts, FontSizes } from '../app/Styles';

import { Option } from '../models/TodoModels';
import TodosStore from '../stores/TodosStore';


import TodoListItem2 from './TodoListItem2';
interface TodoListItemInfo extends VirtualListViewItemInfo {
    todo: Option;
}

export interface TodoListPanelProps extends RX.CommonProps {
    voted: boolean;
    isTiny: boolean;
    selectedTodoId?: string;
    options: Option[]
}

interface TodoListPanelState {
    todos: TodoListItemInfo[];
    filteredTodoList: TodoListItemInfo[];
    searchString: string;
}

const _listItemHeight = 88;

const _styles = {
    listScroll: RX.Styles.createViewStyle({
        flexDirection: 'column',
        alignSelf: 'stretch',
    }),
    todoListHeader: RX.Styles.createViewStyle({
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }),
    searchBox: RX.Styles.createTextInputStyle({
        font: Fonts.displayRegular,
        fontSize: FontSizes.size14,
        borderWidth: 1,
        borderColor: Colors.borderSeparator,
        flex: 1,
        padding: 4,
        marginLeft: 12,
    }),
    container: RX.Styles.createViewStyle({
        flex: 1,
        alignSelf: 'stretch',
    }),
    addTodoButton: RX.Styles.createViewStyle({
        margin: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
    }),
    buttonText: RX.Styles.createTextStyle({
        font: Fonts.displayRegular,
        fontSize: FontSizes.size32,
        lineHeight: 32,
        color: Colors.buttonTextColor,
    }),
    buttonTextHover: RX.Styles.createTextStyle({
        color: Colors.black,
    }),
    label: RX.Styles.createTextStyle({
        font: Fonts.displayBold,
        fontSize: FontSizes.size12,
        color: Colors.menuText2,
    })
};

export default class TodoListPanel extends ComponentBase<TodoListPanelProps, TodoListPanelState> {
    protected _buildState(props: TodoListPanelProps, initState: boolean): Partial<TodoListPanelState> | undefined {
        const partialState: Partial<TodoListPanelState> = {

        };
        if (this.props.options !== undefined) {

            partialState.todos = this.props.options.map((todo, i) => ({
                key: i.toString(),
                height: _listItemHeight,
                template: 'todo',
                todo,
            }));

        } else {
            partialState.todos = [].map((todo, i) => ({
                key: i.toString(),
                height: _listItemHeight,
                template: 'todo',
                todo,
            }));
        }
        if (initState) {
            partialState.searchString = '';
            partialState.filteredTodoList = partialState.todos;
        } else {
            const filter = _.trim(partialState.searchString);
            if (filter) {
                partialState.filteredTodoList = this._filterTodoList(partialState.todos, filter);
            } else {
                partialState.filteredTodoList = partialState.todos;
            }
        }

        return partialState;
    }
    render() {
        return (
            <RX.View useSafeInsets={true} style={_styles.container}>
                <VirtualListView
                    itemList={this.state.filteredTodoList}
                    renderItem={this._renderItem}
                    style={_styles.listScroll}
                />
            </RX.View>
        );
    }

    componentWillUnmount() {
        TodosStore.resetOptions()
    }


    private _filterTodoList(sortedTodos: TodoListItemInfo[], searchString: string): TodoListItemInfo[] {
        const lowerSearchString = searchString.toLowerCase();

        return _.filter(sortedTodos, item => {
            const todoLower = item.todo.title.toLowerCase();
            return todoLower.search(lowerSearchString) >= 0;
        });
    }

    private _renderItem = (details: VirtualListCellRenderDetails<TodoListItemInfo>) => {
        const item = details.item;
        return (
            <TodoListItem2
                isTiny={this.props.isTiny}
                todo={item.todo}
                height={_listItemHeight}
                isSelected={item.todo.id === this.props.selectedTodoId}

                searchString={this.state.searchString}
                onPress={this.props.voted ? () => null : this._onPressTodo}
            />
        );
    };

    private _onPressTodo = (todoId: string) => {

        TodosStore.setOptionById(todoId)
        this.setState({
            searchString: '',
            filteredTodoList: this.state.todos,
        });
    };

}
