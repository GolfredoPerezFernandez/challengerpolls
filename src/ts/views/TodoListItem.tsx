/*
* TodoListItem.tsx
* Copyright: Microsoft 2018
*
* Renders a list item that represents a todo item.
*/

import * as RX from 'reactxp';
import { ComponentBase } from 'resub';

import HoverButton from '../controls/HoverButton';
import { Colors, Fonts, FontSizes } from '../app/Styles';
import { Todo } from '../models/TodoModels';
import TodosStore from '../stores/TodosStore';

interface TodoListItemProps extends RX.CommonProps {
    height: number;
    todo: Todo;
    isSelected: boolean;
    isTiny: boolean;
    searchString?: string;
    onPress: (todoId: string) => void;
}

interface TodoListItemState {
    heightStyle: RX.Types.ViewStyleRuleSet;
}

const _itemBorderWidth = 1;

const _styles = {
    container: RX.Styles.createButtonStyle({
        alignSelf: 'stretch',
        flex: 1,
        borderBottomWidth: _itemBorderWidth,
        borderColor: 'black',
        flexDirection: 'row',
        borderRadius: 12,
        backgroundColor: '#323238',
        alignItems: 'center',
        justifyContent: 'center',
    }),
    todoNameText3: RX.Styles.createTextStyle({
        flex: -1,
        fontSize: FontSizes.size16,
        font: Fonts.displayRegular,
        color: '#00FF0A',
    }),
    todoNameText: RX.Styles.createTextStyle({
        flex: -1,
        fontSize: FontSizes.size20,
        font: Fonts.displayRegular,
        color: Colors.menuText2,
    }),
    todoNameText2: RX.Styles.createTextStyle({
        flex: -1,
        fontSize: FontSizes.size20,
        font: Fonts.displayRegular,
        color: Colors.menuTextSelected,
    }),
    todoNameText4: RX.Styles.createTextStyle({
        flex: -1,
        fontSize: FontSizes.size14,
        font: Fonts.displayRegular,
        color: Colors.menuTextSelected,
    }),
    todoNameText5: RX.Styles.createTextStyle({
        flex: -1,
        fontSize: FontSizes.size14,
        font: Fonts.displayRegular,
        color: Colors.menuText2,
    }),
    todoNameTextSelected: RX.Styles.createTextStyle({
        font: Fonts.displaySemibold,
        color: Colors.menuTextSelected,
    }),
    todoImage: RX.Styles.createImageStyle({
        marginLeft: 16,
        marginRight: 4,
        height: 20,
        width: 24,
    }),
    hovering: RX.Styles.createButtonStyle({
        backgroundColor: Colors.listItemHover,
    }),
    selected: RX.Styles.createButtonStyle({
        backgroundColor: Colors.listItemSelected,
    }),
    todoTextPoll1: RX.Styles.createTextStyle({
        margin: 2,
        fontSize: FontSizes.size16,
        textAlign: 'center',
        color: '#00FF0A',
        backgroundColor: 'transparent',
    }),
    todoTextPoll2: RX.Styles.createTextStyle({
        margin: 2,
        fontSize: FontSizes.size16,
        textAlign: 'center',
        color: '#FF0000',
        backgroundColor: 'transparent',
    }),
};

export default class TodoListItem extends ComponentBase<TodoListItemProps, TodoListItemState> {
    protected _buildState(props: TodoListItemProps, initState: boolean): Partial<TodoListItemState> | undefined {
        const partialState: Partial<TodoListItemState> = {
            heightStyle: RX.Styles.createViewStyle({
                height: props.height,
            }, false),
        };
        return partialState;
    }

    render(): JSX.Element | null {
        return (
            <HoverButton
                onRenderChild={this._onRenderItem}
                onPress={this._onPress} />
        );
    }

    private _onPress = (e: RX.Types.SyntheticEvent) => {
        // Prevent VirtualListView.onItemSelected from
        // being triggering in the web app.
        e.stopPropagation();
        TodosStore.resetOption()
        TodosStore.setOptionsById(this.props.todo.pollId)
        this.props.onPress(this.props.todo.pollId);
    };

    private _onRenderItem = (isHovering: boolean) => {
        const buttonStyles = [_styles.container, this.state.heightStyle];
        if (this.props.isSelected) {
            buttonStyles.push(_styles.selected);
        } else if (isHovering) {
            buttonStyles.push(_styles.hovering);
        }
        let openPoll: JSX.Element;

        let nameText: JSX.Element;
        const searchString = this.props.searchString ? this.props.searchString.trim().toLowerCase() : '';
        let searchSubstrIndex = -1;
        if (searchString) {
            searchSubstrIndex = this.props.todo.title.toLowerCase().indexOf(searchString);
        }

        if (searchSubstrIndex >= 0) {
            nameText = (
                <RX.Text style={_styles.todoNameText} numberOfLines={1}>
                    <RX.Text numberOfLines={1}>
                        {this.props.todo.title.substr(0, searchSubstrIndex)}
                    </RX.Text>
                    <RX.Text style={_styles.todoNameTextSelected} numberOfLines={1}>
                        {this.props.todo.title.substr(searchSubstrIndex, searchString.length)}
                    </RX.Text>
                    <RX.Text numberOfLines={1}>
                        {this.props.todo.title.substr(searchSubstrIndex + searchString.length)}
                    </RX.Text>
                </RX.Text>
            );
        } else {
            nameText = (
                <RX.Text style={this.props.isSelected ? _styles.todoNameText2 : _styles.todoNameText} numberOfLines={1}>
                    {this.props.todo.title}
                </RX.Text>
            );
        }
        openPoll = (
            <RX.Text style={this.props.todo.openPoll === true ? _styles.todoTextPoll1 : _styles.todoTextPoll2} numberOfLines={1}>
                {this.props.todo.openPoll === true ? 'Open Poll' : 'Closed'}
            </RX.Text>
        );
        return (
            <RX.View style={buttonStyles}>
                <RX.View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    {nameText}

                    {openPoll}
                </RX.View>
            </RX.View>
        );
    };
}
