/**
* CreateTodoPanel.tsx
* Copyright: Microsoft 2017
*
* The Todo item edit view.
*/

import * as RX from 'reactxp';

import NavContextStore from '../stores/NavContextStore';
import { Colors, Fonts, FontSizes, Styles } from '../app/Styles';
import TodosStore from '../stores/TodosStore';

interface CreateTodoPanelProps extends RX.CommonProps {
}
interface CreateTodoPanelState extends RX.CommonProps {
}


const _styles = {
    container: RX.Styles.createViewStyle({
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
    }),
    container2: RX.Styles.createViewStyle({
        flex: 1,
        width: 300,
        height: 500,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
    }),
    todoTitle2: RX.Styles.createTextStyle({
        margin: 2,
        fontSize: FontSizes.size20,
        color: Colors.white,
        backgroundColor: 'transparent',
    }),
    todoTitle: RX.Styles.createTextStyle({
        margin: 2,
        alignSelf: 'stretch',
        fontSize: FontSizes.size16,
        color: Colors.white,
        backgroundColor: 'transparent',
    }),
    todoHeader: RX.Styles.createTextStyle({
        margin: 2,
        fontSize: FontSizes.size20,
        alignSelf: 'stretch',
        color: Colors.white,
        backgroundColor: 'transparent',
    }),
    todoTextPoll1: RX.Styles.createTextStyle({
        margin: 2,
        fontSize: FontSizes.size16,
        alignSelf: 'stretch',
        color: '#00FF0A',
        backgroundColor: 'transparent',
    }),
    todoTextPoll2: RX.Styles.createTextStyle({
        margin: 2,
        fontSize: FontSizes.size16,
        alignSelf: 'stretch',
        color: '#FF0000',
        backgroundColor: 'transparent',
    }),
    todoText: RX.Styles.createTextStyle({
        margin: 2,
        fontSize: FontSizes.size16,
        alignSelf: 'stretch',
        color: Colors.white,
        backgroundColor: 'transparent',
    }),
    buttonContainer: RX.Styles.createViewStyle({
        margin: 2,
        height: 100,
        width: 400,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }),
    buttonContainer2: RX.Styles.createViewStyle({
        margin: 2,
        width: 400,
        height: 480,
        paddingHorizontal: 10,
        paddingVertical: 10,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    }),
    editTodoItem: RX.Styles.createTextInputStyle({
        margin: 4,
        marginHorizontal: 8,
        height: 37,
        flex: 1,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'white',
        color: 'white',
        opacity: 0.5,
        backgroundColor: '#323238',
        paddingHorizontal: 4,
        fontSize: FontSizes.size16,
        alignSelf: 'stretch',
    }),
    label: RX.Styles.createTextStyle({
        font: Fonts.displayBold,
        fontSize: FontSizes.size12,
        color: Colors.menuText,
    }),
    label2: RX.Styles.createTextStyle({
        font: Fonts.displayBold,
        fontSize: FontSizes.size12,
        color: Colors.menuText2,
    })
};


interface CreateTodoPanelState {
    title: string;
    description: string;
    closeTime: number;
    duration: number;
    winning: string;
    openPoll: boolean;
    winner: string;
    totalVotes: number;
    options: Options
}
import Switch from "react-switch";
import * as UI from '@sproutch/ui';
import { Options } from '../models/TodoModels';
import TodoListPanel2 from './TodoListPanel2';

export default class CreateTodoPanel extends RX.Component<CreateTodoPanelProps, CreateTodoPanelState> {
    render() {
        return (
            <RX.View style={_styles.container}>

                <UI.Paper elevation={10} style={{ root: { flexDirection: 'row', borderRadius: 12, backgroundColor: '#323238', width: 700, height: 500, } }} >

                    <RX.View style={_styles.buttonContainer2}>

                        <RX.Text style={_styles.todoTitle2}>
                            {'Create new Poll'}
                        </RX.Text>
                        <RX.Text style={_styles.todoTitle}>
                            {'Title'}
                        </RX.Text>
                        <RX.TextInput
                            style={_styles.editTodoItem}
                            value={this.state ? this.state.title : ''}
                            placeholder={'Enter Title'}
                            onChangeText={this._onChangeText}
                            onSubmitEditing={this._onSubmitText}
                            accessibilityId={'EditTodoPanelTextInput'}
                        />

                        <RX.Text style={_styles.todoTitle}>
                            {'Description'}
                        </RX.Text>
                        <RX.TextInput
                            style={_styles.editTodoItem}
                            value={this.state ? this.state.title : ''}
                            placeholder={'Enter Description'}
                            onChangeText={this._onChangeText}
                            onSubmitEditing={this._onSubmitText}
                            accessibilityId={'EditTodoPanelTextInput'}
                        />

                        <RX.Text style={_styles.todoTitle}>
                            {'Add Poll Option'}
                        </RX.Text>
                        <RX.View style={{ marginHorizontal: 10, marginVertical: 10, flexDirection: 'row', width: 380, height: 50, justifyContent: 'center', alignItems: 'center' }}>
                            <RX.TextInput
                                style={[_styles.editTodoItem, { marginHorizontal: 10, marginVertical: 10, }]}
                                value={this.state ? this.state.title : ''}
                                placeholder={'Enter a participant'}
                                onChangeText={this._onChangeText}
                                onSubmitEditing={this._onSubmitText}
                                accessibilityId={'EditTodoPanelTextInput'}
                            />
                            <UI.Button onPress={this._onPressSave} style={{ root: [{ marginLeft: 10, marginRight: 35 }], content: [{ height: 37, backgroundColor: 'white', width: 60, marginBottom: 5, borderRadius: 11, }], label: _styles.label }
                            } elevation={4} variant={"outlined"} label="ADD" />

                        </RX.View>

                        <RX.Text style={_styles.todoTitle}>
                            {'Timed Poll'}
                        </RX.Text>

                        <RX.View style={{ paddingHorizontal: 10, marginHorizontal: 10, flexDirection: 'row', width: 360, height: 55, justifyContent: 'center', alignItems: 'center' }}>
                            <Switch onChange={() => null} checked={false} />

                            <RX.TextInput
                                style={[_styles.editTodoItem, { marginLeft: 20, width: 100 }]}
                                value={this.state ? this.state.title : ''}
                                placeholder={'Enter time in minutes'}
                                onChangeText={this._onChangeText}
                                onSubmitEditing={this._onSubmitText}
                                accessibilityId={'EditTodoPanelTextInput'}
                            />
                        </RX.View>
                        <RX.View style={_styles.buttonContainer}>

                            <RX.Text style={[_styles.todoTitle, { alignSelf: 'center' }]}>
                                {'Ready?'}
                            </RX.Text>
                            <UI.Button onPress={this._onPressSave} style={{ content: [{ height: 47, backgroundColor: 'white', width: 160, marginBottom: 5, borderRadius: 11, }], label: _styles.label }
                            } elevation={4} variant={"outlined"} label="Start" />

                        </RX.View>

                    </RX.View>
                    <RX.View style={_styles.container2}>
                        <TodoListPanel2 optionId={''} />
                    </RX.View>
                </UI.Paper>

            </RX.View>
        );
    }

    private _onChangeText = (newText: string) => {
        this.setState({ title: newText });
    };

    private _onSubmitText = () => {
        this._saveTodo();
    };

    private _onPressSave = () => {
        this._saveTodo();
    };

    private _saveTodo() {
        if (!!this.state && this.state.title && this.state.description && this.state.closeTime
            && this.state.duration && this.state.winning && this.state.openPoll
            && this.state.winner && this.state.totalVotes && this.state.options) {


            const newTodo = TodosStore.addTodo(this.state.title, this.state.description, this.state.closeTime, this.state.duration, this.state.winning, this.state.openPoll, this.state.winner, this.state.totalVotes, this.state.options);
            NavContextStore.navigateToTodoList(NavContextStore.isUsingStackNav() ? undefined : newTodo.id);
        }
    }
}
