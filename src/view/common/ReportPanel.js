/**
 * Created by carter on 10/22/2018.
 */
import React,{Component} from 'react';
import {model} from '../../model/Model'
import Command from "../../constant/Command";
import EventType from "../../constant/EventType";
import {T} from "../../model/language/Translator";

export default class ReportPanel extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount() {
    }

    openReport(e){
        if(e.currentTarget.id == EventType.PP_GAMERULE){
            window.open("./resource/E/gamerule.html", "_blank");
            return;
        }
        model.update(EventType.SHOW_POPUP, e.currentTarget.id);
    }

    render() {
        return (
            <div className="rpt-panel">
                <div className="open" id={EventType.PP_BET_STATUS} onClick={this.openReport.bind(this)}>
                    <img src="img/icOpen.png" width='auto' height='auto'/>
                    <span>{T.translate('mnuOpenBets').toUpperCase()}</span>
                </div>
                <div className="res" id={EventType.PP_RESULT_RPT} onClick={this.openReport.bind(this)}>
                    <img src="img/icRes.png" width='auto' height='auto'/>
                    <span>{T.translate('mnuResult').toUpperCase()}</span>
                </div>
                <div className="bet" id={EventType.PP_BETTING} onClick={this.openReport.bind(this)}>
                    <img src="img/icBet.png" width='auto' height='auto'/>
                    <span>{T.translate('mnuBettingHistory').toUpperCase()}</span>
                </div>
                <div className="rule" id={EventType.PP_GAMERULE} onClick={this.openReport.bind(this)}>
                    <img src="img/icGame.png" width='auto' height='auto'/>
                    <span>{T.translate('mnuGameRule').toUpperCase()}</span>
                </div>
            </div>
        )
    }
}
