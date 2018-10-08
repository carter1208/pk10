/**
 * Created by carter on 9/19/2018.
 */
import React,{Component} from 'react'
import BetPlacePosItem from "../lottery/BetPlacePosItem"
export default class BetPlaceGroupSum3 extends Component{
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
        let arrName = [6,7,10,11,14,15,18,19,22,23,26,27, '', '', ''];
        let jsxRow = [];
        let jsxCol = [];
        for (var i = 0; i < arrName.length; i++){
            if (jsxCol.length > 0) {
                jsxCol.push(<div key={'spacex'+ (i+ 1)} className="space-x"/>);
            }
            if(arrName[i] == ''){
                jsxCol.push(
                    <div key={'empty' + i} className="emptyRow"/>
                );
            }else {
                jsxCol.push(
                    <BetPlacePosItem key={i + 1} onClickBet={this.onClickBet.bind(this)} onBlurBet={this.onBlurBet.bind(this)} onClick={this.onClickBet.bind(this, (i + 1))} id={arrName[i]}
                                     name={'3S' + arrName[i]} oddBetCode={114.15} value={0}/>
                );
            }
            if (jsxCol.length > 7 || i == arrName.length ) {
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
        let arrName1 = ['B','S', 'EV', 'OD'];
        for (var i = 0; i < arrName1.length; i++){
            jsxCol.push(
                <BetPlacePosItem key={arrName1[i]} onClickBet={this.onClickBet.bind(this)} onBlurBet={this.onBlurBet.bind(this)} onClick={this.onClickBet.bind(this, (i+ 1))} id={this.getNamebyKey(arrName1[i])} name={'3S'+arrName1[i]} oddBetCode={114.15} value={0}/>
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
