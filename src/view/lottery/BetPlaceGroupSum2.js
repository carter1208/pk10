/**
 * Created by carter on 9/19/2018.
 */
import React,{Component} from 'react'
import BetPlacePosItem from "../lottery/BetPlacePosItem"

export default class BetPlaceGroupSum2 extends Component{
    constructor(props){
        super();
    }

    componentDidMount(){

    }

    onClickBet(event, index) {
        event.preventDefault();
    }

    getNamebyKey(key){
        let str = '';
        switch (key){
            case 'B':
                str = 'BIG'
                break;
            case 'S':
                str = 'SMALL'
                break;
            case 'OD':
                str = 'ODD'
                break;
            case 'EV':
                str = 'EVEN'
                break;
        }
        return str;
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
        let arrName = [3,4,7,8,11,12,15,16,19];
        let jsxRow = [];
        let jsxCol = [];
        for (var i = 0; i < arrName.length; i++){
            if (jsxCol.length > 0) {
                jsxCol.push(<div key={'spacex'+ (i+ 1)} className="space-x"/>);
            }
            jsxCol.push(
                <BetPlacePosItem key={i + 1} onClickBet={this.onClickBet.bind(this)} onBlurBet={this.onBlurBet.bind(this)} onClick={this.onClickBet.bind(this, (i + 1))} id={arrName[i]}
                                 name={'2S' + arrName[i]} oddBetCode={114.15} value={0}/>
            );
            if (jsxCol.length > 7 || i == arrName.length - 1) {
                if (jsxRow.length > 0) {
                    jsxRow.push(<div key={'spacey' + i} className="space-y"/>);
                }
                if (i == arrName.length - 1) {
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
        let arrName1 = ['B','S', 'EV', 'OD'];
        for (var i = 0; i < arrName1.length; i++){
            jsxCol.push(
                <BetPlacePosItem key={arrName1[i]} onClickBet={this.onClickBet.bind(this)} onBlurBet={this.onBlurBet.bind(this)} onClick={this.onClickBet.bind(this, (i+ 1))} id={this.getNamebyKey(arrName1[i])} name={'2S'+arrName1[i]} oddBetCode={114.15} value={0}/>
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
