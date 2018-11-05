/**
 * Created by carter on 10/31/2018.
 */
import React, {Component, PropTypes} from 'react';
import {T} from '../../model/language/Translator'
import {model} from '../../model/Model';
export default class BetDetailItem extends Component {
    constructor(props) {
        super(props);
        this.betInfo = model.getBetPlaceInfo(this.props.betCode);
    }

    componentDidMount() {
        var $box = $('.radio');
        $box.prop("checked", true);
        this.setValueBet(parseInt(this.props.betAmt));
    }

    hdlClick(e){
        var $box = $(e.currentTarget);
        if ($box.is(":checked")) {
            $box.prop("checked", true);
            this.setValueBet(parseInt(this.props.betAmt));
        } else {
            $box.prop("checked", false);
            this.setValueBet(0);
        }

    }

    removeValueBet(){
        var $box = $('.radio');
        $box.prop("checked", false);
        this.setValueBet(0);
    }

    setValueBet(val){
        console.log('setValueBet', this.props.betCode, val)
        this.betInfo.tempValue = val;
    }

    render() {
        let jsxCol = {};
        if(this.props.status == "SplitBetCode" || this.props.status == "BetOddsChanged")
        {
            jsxCol = <input type="checkbox" className="radio" value="1" name="num" onClick={this.hdlClick.bind(this)}/>
        }else if(this.props.status == 'T'){
            jsxCol = T.translate('BSuccess').toUpperCase();
        }
        else {
            jsxCol = this.props.status;
        }
        return(
            <div className="bet-detail-item">
                <div className="betcode">{T.translate(this.props.betCode)}</div>
                <div className="odd">{this.props.odd}</div>
                <div className="betamt">{this.props.betAmt}</div>
                <div className="status">{jsxCol}</div>
            </div>
        )
    }
}
