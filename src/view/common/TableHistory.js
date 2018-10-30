/**
 * Created by carter on 10/19/2018.
 */
import React,{Component} from 'react';
import {T} from "../../model/language/Translator";
import DrawNoSelection from "./DrawNoSelection";
import ResultPanel from "./ResultPanel";
import {model} from '../../model/Model'
import HistoryPanel from "./HistoryPanel";
const RESULT = 'result';
const TREND = 'trend';
export default class TableHistory extends Component{
    constructor(props){
        super(props);
        this.state = {
            isShow:false,
            drawNo:'',
            name:RESULT,
            arrRes:[]
        }
    }

    componentDidMount() {
    }

    updateHistory(){
        let arr = model.table.history.getHistory;
        let drawNo = arr[arr.length -1].drawNoRef;
        this.setState({
            isShow:true,
            drawNo:drawNo,
            arrRes:arr
        })
        this.refs.cbDraw.updateHistory();
    }

    updateResult(drawNo){
        this.state.drawNo = drawNo;
        if(this.state.name == RESULT){
            this.refs[RESULT].updateResult(drawNo);
        }
    }

    hdlClick(e){
        e.preventDefault();
        $('button').removeClass('his-active');
        $(e.currentTarget).addClass('his-active');
        this.setState({
            name:e.currentTarget.id
        });
        let item = document.getElementById('select-drawno');
        if(e.currentTarget.id == TREND){
            item.style.pointerEvents = 'none';
        }else {
            item.style.pointerEvents = '';
        }
    }

    render() {
        if(!this.state.isShow)
            return(<div></div>)
        let jsxCol = [];
        if(this.state.name == RESULT)
            jsxCol = <ResultPanel ref={RESULT} drawNo={this.state.drawNo}/>
        else
            jsxCol = <HistoryPanel ref={TREND} arrRes={this.state.arrRes}/>
        return (
            <div className="history-container">
                <div className="his-control">
                    <div className="item">
                        <div className="tab">
                            <button className="his-active" onClick={this.hdlClick.bind(this)} type="button" id ={RESULT}>{T.translate('btnResult').toUpperCase()}</button>
                            <button type="button" id ={TREND} onClick={this.hdlClick.bind(this)}>{T.translate('btnTrend').toUpperCase()}</button>
                        </div>
                        <DrawNoSelection ref="cbDraw" updateRes={this.updateResult.bind(this)}/>
                    </div>
                </div>
                {jsxCol}
            </div>
        )
    }
}
