/**
 * Created by carter on 10/18/2018.
 */
import React, {Component} from "react";
import {model} from "../../model/Model";
import {T} from "../../model/language/Translator";
import EventType from '../../constant/EventType'

export default class ResultStat extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount() {

    }

    moveOver(e){
        TweenLite.to(e.currentTarget, 2.5, { x:-55} );
    }

    moveOut(e){
        TweenLite.to(e.currentTarget, 2.5, { x:0} );
    }

    openResultRpt(){
        model.update(EventType.SHOW_POPUP, EventType.PP_RESULT_RPT);
    }

    render() {
        let jsxCol =[];
        let arr = this.props.arrRes.slice(this.props.arrRes.length - 5);
        arr.reverse();
        for(let i = 0; i < arr.length; i++){
            jsxCol.push(
                <div className="stat" key={i}>
                    <div className="num"><span>{i+1}</span></div>
                    <div className="draw"><span>{arr[i].drawNoRef}</span></div>
                    <div className="res"><span onMouseOver={this.moveOver.bind(this)} onMouseOut={this.moveOut.bind(this)}>{arr[i].num.join(",")}</span></div>
                </div>
            );
        }
        return (
            <div className="res-stat">
                <div className="header" style={{paddingLeft:10}}>{T.translate('lbLottery')}</div>
                {jsxCol}
                <div className="btn-Sel" onClick={this.openResultRpt.bind(this)}>{T.translate('lbMoreResult')}</div>
            </div>
        )
    }
}
