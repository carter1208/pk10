/**
 * Created by carter on 9/14/2018.
 */
import React,{Component} from 'react'
import BetPlacePosItem from "../lottery/BetPlacePosItem"
export default class BetPlaceGroupPos extends Component{
    constructor(props){
        super();
    }

    componentDidMount(){

    }

    onClickBet(e, index) {
        e.preventDefault();
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
        let jsxRow = [];
        let jsxCol = [];
        for (var i = 0; i < 10; i++){
            if (jsxCol.length > 0) {
                jsxCol.push(<div key={'spacex'+ (i+ 1)} className="space-x"/>);
            }

            jsxCol.push(
                <BetPlacePosItem key={i+ 1} onClickBet={this.onClickBet.bind(this)} onBlurBet={this.onBlurBet.bind(this)}  onClick={this.onClickBet.bind(this, (i+ 1))} id={(i+ 1)} name={(i+ 1)} oddBetCode={114.15} value={0}/>
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
        let arrName = ['B','S', 'EV', 'OD'];
        for (var i = 0; i < arrName.length; i++){
            jsxCol.push(
                <BetPlacePosItem key={arrName[i]} onClickBet={this.onClickBet.bind(this)} onBlurBet={this.onBlurBet.bind(this)}  onClick={this.onClickBet.bind(this, (i+ 1))} id={this.getNamebyKey(arrName[i])} name={arrName[i]} oddBetCode={114.15} value={0}/>
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

