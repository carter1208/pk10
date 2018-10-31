/**
 * Created by carter on 10/31/2018.
 */
import React, {Component, PropTypes} from 'react';
import {T} from '../../model/language/Translator'
import BetDetailItem from './BetDetailItem'
export default class BetDetailPanel extends Component {
    constructor(props) {
        super(props);
        this.state={
            arrBet:[]
        }
        this.isShow = true;
    }
    //Got text message: {"mes":{"p":{"data":{"result":{"ListBetDetail":[{"Status":"T","Odds":"8.08","AgAccBetAmt":100,"BetAmt":"100","BetCodeID":"3386","BetCode":"Lo1-1","AccBetAmt":100},{"Status":"T","Odds":"9.7","AgAccBetAmt":100,"BetAmt":"100","BetCodeID":"3387","BetCode":"Lo1-2","AccBetAmt":100},{"Status":"T","Odds":"9.7","AgAccBetAmt":100,"BetAmt":"100","BetCodeID":"3392","BetCode":"Lo1-7","AccBetAmt":100},{"Status":"T","Odds":"1.95","AgAccBetAmt":100,"BetAmt":"100","BetCodeID":"4381","BetCode":"Lo1B","AccBetAmt":100}],"AvailCredit":2400.053,"TbID":79,"TrID":"61c68ef0b"},"errorMessage":"","error":0}},"c":"@updateBetting"},"rid":13,"cid":1}
    componentDidMount() {
    }

    updateBetting(data){
        this.setState({
            arrBet:data
        })
    }

    confirmBet(){}

    clearBet(){}

    render() {
        let jsxCol = [];
        this.isShow = false;
        for(let i = 0; i < this.state.arrBet.length; i++){
            let item = this.state.arrBet[i];
            if(parseInt(item.odd) <= 0) return;
            if (item.status == "SplitBetCode" || item.status == "BetOddsChanged")
            {
                this.isShow = true;
            }
            jsxCol.push(<BetDetailItem betCode={item.betCode} odd={item.odd} betAmt={item.betAmt} status={item.status}/>)
        }
        return(
            <div className="bet-detail-panel">
                <div className="header">{T.translate('lblBetDetails').toUpperCase()}</div>
                <div className="content"></div>
                <div className="footer" style={{visibility:this.isShow ? 'visible':'hidden'}}>
                    <button type="button" id ='confirm' onClick={this.confirmBet.bind(this)}>{T.translate('btnConfirm').toUpperCase()}</button>&nbsp;
                    <button type="button" id ='cancel' onClick={this.clearBet.bind(this)}>{T.translate('btnCancel').toUpperCase()}</button>
                </div>
            </div>
        )
    }
}
