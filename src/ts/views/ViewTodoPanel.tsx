/**
* ViewTodoPanel.tsx
* Copyright: Microsoft 2017
*
* The Todo item edit view.
*/

import * as RX from 'reactxp';
import { ComponentBase } from 'resub';

import { Colors, Fonts, FontSizes } from '../app/Styles';
import { Todo, Option } from '../models/TodoModels';
import CurrentUserStore from '../stores/CurrentUserStore';
import TodosStore from '../stores/TodosStore';

export interface ViewTodoPanelProps extends RX.CommonProps {
    todoId: string;
    isTiny: boolean;
    options: Option[]
}

interface ViewTodoPanelState {
    todo: Todo;
    alert: string;
    userAddress: string;
    option: Option; cargando: boolean;
    isLogin: boolean;
    options: Option[]
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
    todoTitle: RX.Styles.createTextStyle({
        margin: 2,
        fontSize: FontSizes.size32,
        alignSelf: 'stretch',
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
        height: 150,
        width: 400,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    }),
    buttonContainer2: RX.Styles.createViewStyle({
        margin: 2,
        width: 400,
        height: 450,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    }),
    todoTitle2: RX.Styles.createTextStyle({
        margin: 2,
        fontSize: FontSizes.size20,
        color: Colors.white,
        backgroundColor: 'transparent',
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

const Moralis = require('moralis');
const serverUrl = "https://qqdpez4ourk2.moralishost.com:2053/server";
const appId = "kVVoRWButUY31vShqdGGQmiya4L0n3kF5aRTUVXk";
Moralis.start({ serverUrl, appId });




import { ViewTodoHook } from './ViewTodoHook';
export default class ViewTodoPanel extends ComponentBase<ViewTodoPanelProps, ViewTodoPanelState> {
    protected _buildState(props: ViewTodoPanelProps, initState: boolean): Partial<ViewTodoPanelState> {

        const newState: Partial<ViewTodoPanelState> = {
            todo: TodosStore.getTodoById(props.todoId),
            isLogin: CurrentUserStore.getLogin(),
            option: TodosStore.getOptionById(),
            userAddress: CurrentUserStore.getUser()?.address,
            alert: '',
            cargando: false

        };
        return newState;
    }
    componentDidMount() {

        var user = Moralis.User.current()
        if (user !== null) {
            let objectId = user.get('objectId')
            let address = user.get('ethAddress')
            CurrentUserStore.setUser(objectId, '', address, 0, 0, 0)
            return
        } else {
            try {
                Moralis.Web3.authenticate().then(async (user: any) => {

                    let objectId = user.get('objectId')
                    let address = user.get('ethAddress')
                    CurrentUserStore.setUser(objectId, '', address, 0, 0, 0)

                    return

                })
            } catch (error) {
                if (error == "Error: User closed modal") {

                    return
                } else {


                    return
                }
            }
        }
        return



    }
    render() {
        return (
            <RX.View style={_styles.container}>

                <ViewTodoHook userAddress={this.state.userAddress} isTiny={this.props.isTiny} todoId={this.props.todoId} option={this.state.option} isLogin={this.state.isLogin} options={this.props.options} todo={this.state.todo} />
            </RX.View>
        );
    }


}
