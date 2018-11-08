/**
 * Created by carter on 9/19/2018.
 */
import React,{Component} from 'react'
import BetPlaceDtItem from "../lottery/BetPlaceDtItem"
export default class BetPlaceGroupDt extends Component{
    constructor(props){
        super();

        this.arrName = ['D1','D2','D3', 'G10', 'G9', 'G8', 'D4', 'D5', 'G7', 'G6'];
    }

    componentDidMount(){
        this.updateOdd();
    }

    onClickBet(event,index) {
        event.preventDefault();
    }

    getNamebyKey(key){
        let str = '';
        switch (key){
            case 1:
            case 4:
                str = '1V10' + this.getTypebyKey(key);
                break;
            case 2:
            case 5:
                str = '2V9' + this.getTypebyKey(key);
                break;
            case 3:
            case 6:
                str = '3V8' + this.getTypebyKey(key);
                break;
            case 7:
            case 10:
                str = '4V7' + this.getTypebyKey(key);
                break;
            case 8:
            case 11:
                str = '5V6' + this.getTypebyKey(key);
                break;
        }
        return str;
    }

    getTypebyKey(key){
        let str = '';
        switch (key){
            case 1:
            case 2:
            case 3:
            case 7:
            case 8:
                str = ' DRAGON'
                break;
            case 4:
            case 5:
            case 6:
            case 10:
            case 11:
                str = ' TIGER'
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

    getValue(){
        for (let i = 0; i < this.arrName.length; i++){
            this.refs['dt' + this.arrName[i]].getValue();
        }
    }

    updateOdd(){
        for (let i = 0; i < this.arrName.length; i++){
            this.refs['dt' + this.arrName[i]].getOdd();
        }
    }

    render(){
        let jsxRow = [];
        let jsxCol = [];
        let idx = 0;
        for (let i = 0; i < 12; i++){
            if (jsxCol.length > 0) {
                jsxCol.push(<div key={'spacex'+ (i+ 1)} className="space-x"/>);
            }
            if(i == 8 || i == 11){
                jsxCol.push(
                    <div key={'empty'} className="emptyRow"/>
                );
            }else {
                jsxCol.push(
                    <BetPlaceDtItem ref={'dt'+this.arrName[idx]} idx={idx} key={i + 1} onClickBet={this.onClickBet.bind(this)} onBlurBet={this.onBlurBet.bind(this)} onClick={this.onClickBet.bind(this, (i + 1))}
                                    id={this.getNamebyKey(i+1)} name={this.arrName[idx]} oddBetCode={114.15}
                                    value={0}/>
                );
                idx++;
            }
            if (jsxCol.length > 3) {
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
        return(
            <div className="betplace-dt">
                {jsxRow}
            </div>
        )
    }
}