/**
 * Created by carter on 10/2/2018.
 */
import React, {Component, PropTypes} from 'react';
import DisplayUtil from '../util/DisplayUtil'
import EventType from '../../constant/EventType'
import {model} from '../../model/Model'
import {T} from "../../model/language/Translator";

export default class SubMenu extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount() {
    }

    showPopup(e){
        console.log('click report',e.nativeEvent.which)
        if(e.nativeEvent.which != 1) return;
        e.stopPropagation();
        if(e.currentTarget.id == EventType.PP_GAMERULE){
            window.open("./resource/E/gamerule.html", "_blank");
            return;
        }
        model.update(EventType.SHOW_POPUP, e.currentTarget.id);
        $('.sub-menu').removeClass('active');
    }

    render() {
        return (
            <div className="sub-menu" id="subMenu" style={DisplayUtil.backgroundStyle('./img/bgSubMenu.png')} tabIndex={0}>
                <div id={EventType.PP_BET_STATUS} onMouseDown={this.showPopup.bind(this)}>
                    <img src="img/icOpen.png"/>
                    <span>{T.translate('mnuOpenBets').toUpperCase()}</span>
                </div>
                <div id={EventType.PP_RESULT_RPT} onMouseDown={this.showPopup.bind(this)}>
                    <img src="img/icRes.png"/>
                    <span>{T.translate('mnuResult').toUpperCase()}</span>
                </div>
                <div id={EventType.PP_BETTING} onMouseDown={this.showPopup.bind(this)}>
                    <img src="img/icBet.png"/>
                    <span>{T.translate('mnuBettingHistory').toUpperCase()}</span>
                </div>
                <div id={EventType.PP_GAMERULE} onMouseDown={this.showPopup.bind(this)}>
                    <img src="img/icGame.png"/>
                    <span>{T.translate('mnuGameRule').toUpperCase()}</span>
                </div>
            </div>
        )
    }
}
