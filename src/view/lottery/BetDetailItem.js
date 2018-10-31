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
    }

    hdlClick(e){
        var $box = $(e.currentTarget);
        if ($box.is(":checked")) {
            var group = "input:checkbox[name='" + $box.attr("name") + "']";
            $(group).prop("checked", false);
            $box.prop("checked", true);
            this.idx = parseInt(e.currentTarget.value);
        } else {
            $box.prop("checked", false);
            this.idx = 0;
        }
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
                <div className="betcode">{this.props.betCode}</div>
                <div className="odd">{this.props.odd}</div>
                <div className="betamt">{this.props.betAmt}</div>
                <div className="status">{jsxCol}</div>
            </div>
        )
    }
}
