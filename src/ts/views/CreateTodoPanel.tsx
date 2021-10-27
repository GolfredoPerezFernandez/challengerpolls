/**
* CreateTodoPanel.tsx
* Copyright: Microsoft 2017
*
* The Todo item edit view.
*/

import * as RX from 'reactxp';

import { Colors, Fonts, FontSizes } from '../app/Styles';

interface CreateTodoPanelProps extends RX.CommonProps {
    isLogin: boolean;
    isTiny: boolean;
    pollOptions: Option[]
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
        height: 404,
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
    time: any;
    switch: boolean,
    winning: string;
    openPoll: boolean;
    pollOptions: Option[];
    winner: string;
    totalVotes: number;
    option: string,
    isLogin: boolean;
    alert: string,
}

import { Option } from '../models/TodoModels';
import { CreateTodoHook } from './CreateTodoHook';

export default class CreateTodoPanel extends RX.Component<CreateTodoPanelProps, CreateTodoPanelState> {
    protected _buildState(props: CreateTodoPanelProps, initState: boolean): Partial<CreateTodoPanelState> {
        const newState: Partial<CreateTodoPanelState> = {

        };

        return newState;
    }
    render() {
        return (
            <RX.View style={_styles.container}>
                <CreateTodoHook isTiny={this.props.isTiny} pollOptions={this.props.pollOptions} isLogin={this.props.isLogin} />
            </RX.View>
        );
    }
}
