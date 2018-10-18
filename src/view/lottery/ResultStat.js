/**
 * Created by carter on 10/18/2018.
 */
import React,{Component} from 'react';
import {model} from '../../model/Model'
import Command from "../../constant/Command";
export default class ResultStat extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount() {

    }

    openGame(e){
        model.update(Command.OPEN_TABLE, e.currentTarget.id);
    }

    render() {
        let jsxCol =[];
        let arr = this.props.arrRes.slice(this.props.arrRes.length - 5);
        arr.reverse();
        for(let i = 0; i < arr.length; i++){
            jsxCol.push(
                <div className="stat" key={i}>
                    <div className="num"><span>{i+1}</span></div>
                    <div className="draw"><span>{arr[i].drawNoRef}</span></div>
                    <div className="res"><span>{arr[i].num.join(",")}</span></div>
                </div>
            );
        }
        return (
            <div className="res-stat">
                <div className="header">Lottery Time</div>
                {jsxCol}
                <div className="btn-Sel">Detail Result</div>
            </div>
        )
    }
}
