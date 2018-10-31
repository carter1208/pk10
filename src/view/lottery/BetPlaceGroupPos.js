/**
 * Created by carter on 9/14/2018.
 */
import React,{Component} from 'react'
import BetPlacePosItem from "../lottery/BetPlacePosItem";
import GameUtil from '../util/GameUtil'

export default class BetPlaceGroupPos extends Component{
    constructor(props){
        super();
        this.arrName = ['B','S', 'OD', 'EV'];
    }

    componentDidMount(){

    }

    onClickBet(e, index) {
        e.preventDefault();
    }

    updateOdd(){
        for (let i = 0; i < 10; i++){
            this.refs['pos' + (i+ 1)].getOdd();
        }
        for (let i = 0; i < this.arrName.length; i++){
            this.refs['pos' + this.arrName[i]].getOdd();
        }
    }

    getValue(){
        let total = 0;
        for (let i = 0; i < 10; i++){
            this.refs['pos' + (i+ 1)].getValue();
        }
        for (let i = 0; i < this.arrName.length; i++){
            this.refs['pos' + this.arrName[i]].getValue();
        }
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

    render(){
        let jsxRow = [];
        let jsxCol = [];
        let idx = 0;
        for (var i = 0; i < 10; i++){
            idx++;
            if (jsxCol.length > 0) {
                jsxCol.push(<div key={'spacex'+ (i+ 1)} className="space-x"/>);
            }

            jsxCol.push(
                <BetPlacePosItem ref={'pos' + (i+ 1)} key={i+ 1} idx={idx} onClickBet={this.onClickBet.bind(this)} onBlurBet={this.onBlurBet.bind(this)}  onClick={this.onClickBet.bind(this, (i+ 1))} id={(i+ 1)} name={(i+ 1)} oddBetCode={114.15} value={0}/>
            );
            if (jsxCol.length > 7 || i == 9) {
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

        for (var i = 0; i < this.arrName.length; i++){
            idx++;
            jsxCol.push(
                <BetPlacePosItem ref={'pos' + this.arrName[i]} idx={idx} key={this.arrName[i]} onClickBet={this.onClickBet.bind(this)} onBlurBet={this.onBlurBet.bind(this)}  onClick={this.onClickBet.bind(this, (i+ 1))} id={GameUtil.getNamebyKey(this.arrName[i])} name={this.arrName[i]} oddBetCode={114.15} value={0}/>
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
            <div className="betplace-pos">
                {jsxRow}
            </div>
        )
    }
}

