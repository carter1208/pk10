/**
 * Created by carter on 10/29/2018.
 */
import React,{Component} from 'react';
import ItemHistory from "./ItemHistory";
import {model} from '../../model/Model'
export default class ResultPanel extends Component{
    constructor(props){
        super(props);
        this.idx = 0;
        this.state = {
            arrRes:[1,2,3,4,5,6,7,8,9,10],
            arrCar:[],
            drawNo: this.props.drawNo,
            arrPos:[]
        }
    }

    componentDidMount() {
        this.getPositionCar();
        this.updateResult(this.state.drawNo);
    }

    updateResult(drawNo){
        if(drawNo == '')return;
        let arr = model.getHistoryByDrawNo(drawNo);
        for (let i = 0; i < arr.length; i++ ) {
            let id = arr[i];
            let item = this.refs['item'+id];
            item.updateResult(this.state.arrPos[i].x, this.state.arrPos[i].y, i+1);
        }
    }


    getPositionCar(){
        let px = -168;
        let py = 0;
        this.state.arrPos = [];
        for(let i = 0; i < 10; i++){
            if(i % 5 == 0 && i != 0){
                px = -168;
                py = 74;
            }
            px += 168;
            let x = px;
            let y = py;
            let p = {x,y};
            this.state.arrPos.push(p);
        }
    }

    render() {
        let jsxRow = [];
        let jsxCol = [];
        for (var i = 0; i < this.state.arrRes.length; i++){
            if (jsxCol.length > 0) {
                jsxCol.push(<div key={'spacex'+ (i+ 1)} className="space-x"/>);
            }
            jsxCol.push(
                <ItemHistory ref={'item'+ (i+1)} key={i+ 1} pos={i+1} id={this.state.arrRes[i]}/>
            );
            this.state.arrCar.push(<ItemHistory ref={div => this['item'+ (i+1)] = div} key={i+ 1} pos={i+1} id={this.state.arrRes[i]}/>);
            if (jsxCol.length > 7 || i == this.state.arrRes.length-1) {
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
            <div className="result-panel">
                {jsxRow}
            </div>
        )
    }
}
