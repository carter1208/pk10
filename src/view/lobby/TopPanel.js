/**
 * Created by carter on 9/28/2018.
 */
import React, {Component, PropTypes} from 'react';
import DisplayUtil from '../util/DisplayUtil'
import {model} from '../../model/Model';
import UserPanel from "./UserPanel";
import SubMenu from "./SubMenu";
import Command from "../../constant/Command";

export default class TopPanel extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLobby:this.props.tbID == 0,
            showMenu:false
        };
    }
    componentDidMount() {
    }

    onBlur(e){
        e.stopPropagation();
        this.setState({
            showMenu:false
        });
        $('.sub-menu').removeClass('active')
    }

    showMenu(e){
        e.stopPropagation();
        if(this.state.isLobby) {
            if (!this.state.showMenu) {
                $('.sub-menu').addClass('active')
                this.setState({txtBalance: this.state.balance})
            } else {
                $('.sub-menu').removeClass('active')
                this.setState({txtBalance: this.state.total})
            }
            this.state.showMenu = !this.state.showMenu;
        }else {
            model.update(Command.BACK_LOBBY)
        }
    }

    render() {
        let icon = this.state.isLobby ? './img/menu_lb.png' : './img/menu_game.png';
        return (
            <div className="top-panel" style={DisplayUtil.backgroundStyle('./img/bgTop.png')}>
                <div className="left">
                    <div className="icon" tabIndex={0} style={DisplayUtil.backgroundStyle(icon)} onClick={this.showMenu.bind(this)}  onBlur={this.onBlur.bind(this)}>
                    </div>
                </div>
                <div className="right">
                    <UserPanel ref="userPanel"/>
                </div>
                <SubMenu/>
            </div>
        )
    }
}