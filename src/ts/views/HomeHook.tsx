/**
* CreateTodoPanel.tsx
* Copyright: Microsoft 2017
*
* The Todo item edit view.
*/

import * as RX from 'reactxp';

import { Colors, Fonts, FontSizes, Styles } from '../app/Styles';

const _styles = {
    container: RX.Styles.createViewStyle({
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
    }),
    todoText: RX.Styles.createTextStyle({
        margin: 8,
        fontSize: FontSizes.size32,
        alignSelf: 'center',
        textAlign: 'center',
        color: Colors.white,
        backgroundColor: 'transparent',
    }),
    todoText2: RX.Styles.createTextStyle({
        margin: 8,
        fontSize: FontSizes.size16,
        alignSelf: 'center',
        marginBottom: 20,
        textAlign: 'center',
        color: Colors.white,
        backgroundColor: 'transparent',
    }),
    editTodoItem: RX.Styles.createTextInputStyle({
        margin: 8,
        height: 32,
        paddingHorizontal: 4,
        fontSize: FontSizes.size16,
        alignSelf: 'stretch',
    }),
    buttonContainer: RX.Styles.createViewStyle({
        margin: 8,
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    }),
    label: RX.Styles.createTextStyle({
        font: Fonts.displayBold,
        fontSize: FontSizes.size12,
        color: 'black',
    })
};

import * as UI from '@sproutch/ui';
import NavContextStore from '../stores/NavContextStore';

export const HomeHook = ({
    isLogin,
    cargando,
    isTiny,
    transactionEth,
    transactionBsc,
    transactionMatic
}: {
    cargando: boolean;
    isLogin: boolean;
    isTiny: boolean;
    transactionEth: number,
    transactionBsc: number,
    transactionMatic: number
}) => {

    return (
        <RX.View useSafeInsets={true} style={[_styles.container, Styles.statusBarTopMargin]}>
            <UI.Paper elevation={10} style={{ root: { justifyContent: 'center', alignItems: 'center', flexDirection: 'column', borderRadius: 12, backgroundColor: '#323238', width: isTiny ? 370 : 700, height: isTiny ? 550 : 500, } }} >

                <RX.Text style={_styles.todoText}>
                    {'Welcome to Challenger Polls'}
                </RX.Text>
                <RX.Text style={_styles.todoText2}>
                    {'created for Weekly Challenge'}
                </RX.Text>
                <RX.Text style={_styles.todoText2}>
                    {'Must have at least one transaction on Ethereum, Binance Smart Chain or Polygon Network'}
                </RX.Text>
                <UI.Button onPress={() => NavContextStore.navigateToTodoList('', true)} style={{ root: [{ marginLeft: 10 }], content: [{ width: 200, backgroundColor: 'white', marginBottom: 5, borderRadius: 11, }], label: _styles.label }
                } elevation={4} variant={"outlined"} label="+ Start Creating a New Poll" />



            </UI.Paper>
        </RX.View>

    );

};
