/*
* TopBarComposite.tsx
* Copyright: Microsoft 2018
*
* Horizontal bar that appears on the top of every view within the app
* when it's using composite layout (as opposed to stack-based layout).
*/

import ImageSource from 'modules/images';
import * as RX from 'reactxp';
import { ComponentBase } from 'resub';

import HoverButton from '../controls/HoverButton';
import NavContextStore from '../stores/NavContextStore';
import { Colors, Fonts, FontSizes } from '../app/Styles';

import CurrentUserStore from '../stores/CurrentUserStore';
import { User } from '../models/IdentityModels';


const _styles = {
    background: RX.Styles.createViewStyle({
        alignSelf: 'stretch',
        height: 88,
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: 16,
    }),
    logoContainer: RX.Styles.createViewStyle({
        flexDirection: 'row',
        alignItems: 'center',
    }),
    barControlsContainer: RX.Styles.createViewStyle({
        flex: 1,
        alignItems: 'center',
        paddingRight: 100,
        justifyContent: 'flex-end',
        flexDirection: 'row',
    }),
    logoImage: RX.Styles.createImageStyle({
        height: 24,
        width: 26,
    }),
    logoText: RX.Styles.createTextStyle({
        font: Fonts.displaySemibold,
        fontSize: FontSizes.size20,
        marginHorizontal: 4,
        color: Colors.logoColor,
    }),
    linkText: RX.Styles.createTextStyle({
        font: Fonts.displayRegular,
        fontSize: FontSizes.menuItem,
        marginHorizontal: 8,
        color: Colors.menuText,
    }),
    linkTextHover: RX.Styles.createTextStyle({
        color: Colors.menuTextHover,
    }),
    backButtonContainer: RX.Styles.createViewStyle({
        flexDirection: 'row',
        alignItems: 'center',
    }),
    backText: RX.Styles.createTextStyle({
        font: Fonts.displayRegular,
        fontSize: FontSizes.size16,
        color: Colors.menuText,
    }),
    label: RX.Styles.createTextStyle({
        font: Fonts.displayBold,
        fontSize: FontSizes.size12,
        color: Colors.menuText2,
    })
};

export interface TopBarCompositeProps extends RX.CommonProps {
    showBackButton: boolean;
    onBack?: () => void;
}

export interface TopBarCompositeState extends RX.CommonProps {
    isLogin: boolean;
    user: User;
}
export default class TopBarComposite extends ComponentBase<TopBarCompositeProps, TopBarCompositeState> {

    protected _buildState(props: TopBarCompositeProps, initState: boolean): Partial<TopBarCompositeState> {
        const newState: Partial<TopBarCompositeState> = {
            isLogin: CurrentUserStore.getLogin(),
            user: CurrentUserStore.getUser(),
        };

        return newState;
    }

    render(): JSX.Element | null {
        let leftContents: JSX.Element | undefined;

        if (this.props.showBackButton) {
            leftContents = (
                <HoverButton onPress={this._onPressBack} onRenderChild={this._renderBackButton} />
            );
        } else {
            leftContents = (
                <RX.Button onPress={this._onPressLogo}>
                    <RX.View style={_styles.logoContainer}>
                        <RX.Image source={ImageSource.todoLogo} style={_styles.logoImage} />
                        <RX.Text style={_styles.logoText}>
                            {'CHALLENGER POLLS'}
                        </RX.Text>
                    </RX.View>
                </RX.Button>
            );
        }
        let leng: number = 0
        if (this.state?.user?.address) {

            leng = this.state?.user?.address?.length
        }
        return (
            <RX.View style={_styles.background}>
                {leftContents}

                <RX.View style={_styles.barControlsContainer}>
                    {!this.state.isLogin ? null : this.state.user.address?.substring(0, 5).toUpperCase() ? '' :
                        <RX.Text style={{ color: 'white' }}>
                            {this.state ? !this.state.user.address ? null : this.state.user.address?.substring(0, 5).toUpperCase() + '...' + this.state.user.address?.substring(leng - 3, leng).toUpperCase() : ''}
                        </RX.Text>
                    }
                </RX.View>
            </RX.View>
        );
    }

    private _onPressBack = (e: RX.Types.SyntheticEvent) => {
        e.stopPropagation();

        if (this.props.onBack) {
            this.props.onBack();
        }
    };

    private _renderBackButton = (isHovering: boolean) => (
        <RX.View style={_styles.backButtonContainer}>
            <RX.Text style={[_styles.backText, isHovering ? _styles.linkTextHover : undefined]}>
                {'To Polls'}
            </RX.Text>
        </RX.View>
    );

    private _onPressLogo = (e: RX.Types.SyntheticEvent) => {
        e.stopPropagation();

        NavContextStore.navigateToTodoList('', false);
    };

}
