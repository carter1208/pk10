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
            arrBet:[],
            arrBetItem:[],
            isShow:false
        }
        this.isShowBtn = true;
    }

    componentDidMount() {
    }

    updateBetting(data){
        this.setState({
            isShow:true,
            arrBet:data
        })
    }

    confirmBet(){
        //call bet function
    }

    clearBet(){
        for(let i = 0; i < this.state.arrBet.length; i++){
            let item = this.refs['item'+(i+1)];
            item.removeValueBet();
        }
    }


    close(e){
        this.clearBet();
        this.setState({
            isShow:false
        });
    }

    render() {
        if(!this.state.isShow)
            return(<div></div>);
        let jsxCol = [];
        this.isShowBtn = false;
        for(let i = 0; i < this.state.arrBet.length; i++){
            let item = this.state.arrBet[i];
            if(parseInt(item.odd) <= 0) return;
            if (item.status == "SplitBetCode" || item.status == "BetOddsChanged")
            {
                this.isShowBtn = true;
            }
            jsxCol.push(<BetDetailItem key={i} ref={'item'+ (i+1)} betCode={item.betCode} odd={item.odd} betAmt={item.betAmt} status={item.status}/>)
        }
        return(
            <div className="bet-detail-panel">
                <div className="detail-container">
                    <div className="header">
                        <span>{T.translate('lblBetDetails').toUpperCase()}</span>
                        <img src="img/close.png" width='21' height='20' onClick={this.close.bind(this)}/>
                    </div>
                    <div className="content">
                        <div className="desc">{T.translate('messBetDetails')}</div>
                        <div className="title-detail">
                            <div className="betcode">{T.translate('lblBetCode').toUpperCase()}</div>
                            <div className="odd">{T.translate('LoOdd').toUpperCase()}</div>
                            <div className="betamt">{T.translate('lblBetAmt').toUpperCase()}</div>
                            <div className="status">{T.translate('lbStatus').toUpperCase()}</div>
                        </div>
                        <div className="list sroll-content">
                            {jsxCol}
                        </div>
                    </div>
                    <div className="footer" style={{visibility:this.isShowBtn ? 'visible':'hidden'}}>
                        <button type="button" id ='confirm' onClick={this.confirmBet.bind(this)}>{T.translate('btnConfirm')}</button>&nbsp;
                        <button type="button" id ='cancel' onClick={this.clearBet.bind(this)}>{T.translate('btnCancel')}</button>
                    </div>
                </div>
            </div>
        )
    }
}
