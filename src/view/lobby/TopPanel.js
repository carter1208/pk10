/**
 * Created by carter on 9/28/2018.
 */
import React, {Component, PropTypes} from 'react';
import DisplayUtil from '../util/DisplayUtil'
import {model} from '../../model/Model';
import UserPanel from "./UserPanel";
import SubMenu from "./SubMenu";

export default class TopPanel extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLobby:true,
            showMenu:false
        };
    }
    componentDidMount() {
    }

    onBlur(e){
        $('.sub-menu').removeClass('active')
        this.setState({})
        this.setState({
            showMenu:false
        });
    }

    showMenu(e){
        e.preventDefault();
        if(!this.state.showMenu){
            $('.sub-menu').addClass('active')
            this.setState({txtBalance:this.state.balance})
        }else {
            $('.sub-menu').removeClass('active')
            this.setState({txtBalance:this.state.total})
        }

        this.state.showMenu = !this.state.showMenu;
    }

    render() {
        let icon = this.state.isLobby ? './img/menu_lb.png' : './img/menu_game.png';
        return (
            <div className="top-panel" style={DisplayUtil.backgroundStyle('./img/bgTop.png')}>
                <div className="icon" tabIndex={0} style={DisplayUtil.backgroundStyle(icon)} onClick={this.showMenu.bind(this)} onBlur={this.onBlur.bind(this)}>
                </div>
                <UserPanel ref="userPanel"/>
                <SubMenu/>
            </div>
        )
    }
}