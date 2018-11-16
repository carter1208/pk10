/**
 * Created by carter on 9/19/2018.
 */
import React,{Component} from 'react'
import BetPlacePosItem from "../lottery/BetPlacePosItem"
import GameUtil from '../util/GameUtil'

export default class BetPlaceGroupSum2 extends Component{
    constructor(props){
        super();
        this.arrName = [3,4,7,8,11,12,15,16,19];
        this.arrName1 = ['B','S', 'OD', 'EV'];
    }

    componentDidMount(){

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

    getValue(){
        for (let i = 0; i < this.arrName.length; i++){
            this.refs['sum2' + this.arrName[i]].getValue();
        }
    }

    updateOdd(){
        for (let i = 0; i < this.arrName.length; i++){
            this.refs['sum2' + this.arrName[i]].getOdd();
        }
        for (let i = 0; i < this.arrName1.length; i++){
            this.refs['sum2' + this.arrName1[i]].getOdd();
        }
    }

    render(){
        let jsxRow = [];
        let jsxCol = [];
        let idx = 0
        for (let i = 0; i < this.arrName.length; i++){
            idx++;
            if (jsxCol.length > 0) {
                jsxCol.push(<div key={'spacex'+ (i+ 1)} className="space-x"/>);
            }
            jsxCol.push(
                <BetPlacePosItem ref={'sum2' + this.arrName[i]} key={i + 1} onClickBet={this.onClickBet.bind(this)} onBlurBet={this.onBlurBet.bind(this)} onClick={this.onClickBet.bind(this)} id={this.arrName[i]}
                                 name={'2S' + this.arrName[i]} oddBetCode={114.15} value={0} idx={idx}/>
            );
            if (jsxCol.length > 7 || i == this.arrName.length - 1) {
                if (jsxRow.length > 0) {
                    jsxRow.push(<div key={'spacey' + i} className="space-y"/>);
                }
                if (i == this.arrName.length - 1) {
                    jsxCol.push(
                        <div key={'empty'} className="emptyRow"/>
                    );
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
                <BetPlacePosItem idx={idx} ref={'sum2' + this.arrName1[i]} key={this.arrName1[i]} onClickBet={this.onClickBet.bind(this)} onBlurBet={this.onBlurBet.bind(this)} onClick={this.onClickBet.bind(this, (i+ 1))} id={GameUtil.getNamebyKey(this.arrName1[i])} name={'2S'+this.arrName1[i]} oddBetCode={114.15} value={0}/>
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
            <div className="betplace-sum2">
                {jsxRow}
            </div>
        )
    }
}
