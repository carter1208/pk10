/**
 * Created by carter on 10/2/2018.
 */
import React, {Component, PropTypes} from 'react';
import DisplayUtil from '../util/DisplayUtil'
import EventType from '../../constant/EventType'
import {model} from '../../model/Model'

export default class SubMenu extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount() {
    }

    showPopup(e){
        console.log('click report',e.currentTarget.id)
        model.update(EventType.SHOW_POPUP, e.currentTarget.id);
        $('.sub-menu').removeClass('active');
    }

    render() {
        return (
            <div className="sub-menu" style={DisplayUtil.backgroundStyle('./img/bgSubMenu.png')} tabIndex={1}>
                <div id={EventType.PP_BET_STATUS} onMouseDown={this.showPopup.bind(this)}>
                    <img src="img/icOpen.png"/>
                    <span>OPEN BETS</span>
                </div>
                <div id={EventType.PP_RESULT_RPT} onMouseDown={this.showPopup.bind(this)}>
                    <img src="img/icRes.png"/>
                    <span>RESULT</span>
                </div>
                <div id={EventType.PP_BETTING} onMouseDown={this.showPopup.bind(this)}>
                    <img src="img/icBet.png"/>
                    <span>BETTING HISTORY</span>
                </div>
                <div id={EventType.PP_GAMERULE} onMouseDown={this.showPopup.bind(this)}>
                    <img src="img/icGame.png"/>
                    <span>GAME RULE</span>
                </div>
            </div>
        )
    }
}
