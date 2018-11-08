/**
 * Created by carter on 9/19/2018.
 */
import React,{Component} from 'react'
import BetPlacePosItem from "../lottery/BetPlacePosItem"
import GameUtil from '../util/GameUtil'

export default class BetPlaceGroupSum3 extends Component{
    constructor(props){
        super();
        this.arrName = [6,7,10,11,14,15,18,19,22,23,26,27, '', '', ''];
        this.arrName1 = ['B','S', 'OD', 'EV'];
    }

    componentDidMount(){

    }

    onClickBet(event, index) {
        event.preventDefault();
    }

    onClickBet(e){
        e.preventDefault();
        if(this.props.onClickBet)
            this.props.onClickBet(e);
    }

    onBlurBet(){
        if(this.props.onBlurBet)
            this.props.onBlurBet();
    }

    updateOdd(){
        for (let i = 0; i < this.arrName.length; i++){
            this.refs['sum3' + this.arrName[i]].getOdd();
        }
        for (let i = 0; i < this.arrName1.length; i++){
            this.refs['sum3' + this.arrName1[i]].getOdd();
        }
    }

    render(){
        let jsxRow = [];
        let jsxCol = [];
        let idx = 0;
        for (let i = 0; i < this.arrName.length; i++){
            idx++;
            if (jsxCol.length > 0) {
                jsxCol.push(<div key={'spacex'+ (i+ 1)} className="space-x"/>);
            }
            if(this.arrName[i] == ''){
                jsxCol.push(
                    <div key={'empty' + i} className="emptyRow"/>
                );
            }else {
                jsxCol.push(
                    <BetPlacePosItem idx={idx} ref={'sum3' + this.arrName[i]} key={i + 1} onClickBet={this.onClickBet.bind(this)} onBlurBet={this.onBlurBet.bind(this)} onClick={this.onClickBet.bind(this, (i + 1))} id={this.arrName[i]}
                                     name={'3S' + this.arrName[i]} oddBetCode={114.15} value={0}/>
                );
            }
            if (jsxCol.length > 7 || i == this.arrName.length ) {
                if (jsxRow.length > 0) {
                    jsxRow.push(<div key={'spacey' + i} className="space-y"/>);
                }
                jsxRow.push(
                    <div key={'row'+(i+ 1)} className="table-row">
                        {jsxCol}
                    </div>
                );
                jsxCol = [];
            }
        }
        for (let i = 0; i < this.arrName1.length; i++){
            idx++;
            jsxCol.push(
                <BetPlacePosItem idx={idx} ref={'sum3' + this.arrName1[i]} key={this.arrName1[i]} onClickBet={this.onClickBet.bind(this)} onBlurBet={this.onBlurBet.bind(this)} onClick={this.onClickBet.bind(this, (i+ 1))} id={GameUtil.getNamebyKey(this.arrName1[i])} name={'3S'+this.arrName1[i]} oddBetCode={114.15} value={0}/>
            );
        }
        jsxCol.push(
            <div key={'empty'} className="emptyRow"/>
        );
        jsxRow.push(
            <div key={'row'+(3)} className="table-row">
                {jsxCol}
            </div>
        );
        return(
            <div className="betplace-sum3">
                {jsxRow}
            </div>
        )
    }
}
