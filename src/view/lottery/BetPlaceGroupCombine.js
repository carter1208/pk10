/**
 * Created by carter on 9/19/2018.
 */
import React,{Component} from 'react'
import BetPlaceCombine2Item from "../lottery/BetPlaceCombine2Item"
import BetPlaceCombine3Item from "../lottery/BetPlaceCombine3Item"
import ListNumber from "./ListNumber"

const CB2 = 'cb2';
const CB3 = 'cb3';
export default class BetPlaceGroupCombine extends Component {
    constructor(props) {
        super();
        this.currItem = null;
        this.state={
            arr: [1,2,3,4,5,6,7,8,9,10],
            sence: CB2
        };
    }

    componentDidMount() {
    }

    onClickItem(e, exist){
        e.preventDefault();
        let newArr = this.state.arr.concat();
        var p = $(e.currentTarget).position();
        for (let i=0; i < exist.length; i++){
            if(newArr.indexOf(exist[i]) != -1){
                newArr.splice(newArr.indexOf(exist[i]), 1);
            }
        }
        this.refs.listNum.updateList(newArr, true, p.left, p.top);
        this.currItem = e.currentTarget.parentNode;
    }

    onBlurBet(){
        if(this.props.onBlurBet)
            this.props.onBlurBet();
    }
    onBlur(){
        this.refs.listNum.updateList(this.state.arr, false, 0, 0);
    }

    showCombineBet(id){
        this.setState({
            sence: id
        });
    }

    hdlClickNum(id){
        this.refs[this.currItem.id].getColor(id, this.currItem.childNodes);
    }

    onClickBet(e){
        e.preventDefault();
        if(this.props.onClickBet)
            this.props.onClickBet(e);
    }

    render() {
        let jsxRow = [];
        let jsxCol = [];
        for (var i = 0; i < 6; i++){
            if (jsxCol.length > 0) {
                jsxCol.push(<div key={'spacex'+ (i+ 1)} className="space-x"/>);
            }
            if(this.state.sence == CB2){
                jsxCol.push(
                    <BetPlaceCombine2Item ref={"combine2-"+i} idItem={"combine2-"+i} key={i+1} onClickBet={this.onClickBet.bind(this)} onBlurBet={this.onBlurBet.bind(this)} onClickItem={this.onClickItem.bind(this)} obBlurItem={this.onBlur.bind(this)} oddBetCode={114.15} value={0}/>
                );
            }
            else {
                jsxCol.push(
                    <BetPlaceCombine3Item ref={"combine3-"+i} idItem={"combine3-"+i} key={i+1} onClickBet={this.onClickBet.bind(this)} onBlurBet={this.onBlurBet.bind(this)} onClickItem={this.onClickItem.bind(this)} obBlurItem={this.onBlur.bind(this)} oddBetCode={114.15} value={0}/>
                );
            }
            if (jsxCol.length > 2 || i == 9) {
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
        return (
            <div className="betplace-combine2">
                {jsxRow}
                <ListNumber className="list-num" ref="listNum" arrNum={this.arr} onClickItem={this.hdlClickNum.bind(this)} style={{zIndex:5}}/>
            </div>
        );
    }
}