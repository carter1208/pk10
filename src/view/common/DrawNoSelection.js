/**
 * Created by carter on 10/19/2018.
 */
import React,{Component} from 'react';
import {model} from '../../model/Model'
export default class DrawNoSelection extends Component {
    constructor(props){
        super(props);
        this.state={
            idx:0,
            drawNoHis:0,
            arrRes:[]
        }
    }

    componentDidMount() {
    }
    updateHistory(){
        let arr = model.table.history.getHistory;
        this.setState({
            arrRes:arr,
            idx:arr.length -1,
            drawNoHis:arr[arr.length -1].drawNoRef
        });
        this.updateResult(this.state.drawNoHis);
    }

    prev(){
        if(this.state.idx == 0){
            return;
        }
        this.state.idx--;
        this.updateResult(this.state.arrRes[this.state.idx].drawNoRef);
    }

    next(){
        if(this.state.idx >= this.state.arrRes.length - 1){
            return;
        }
        this.state.idx++;
        this.updateResult(this.state.arrRes[this.state.idx].drawNoRef);
    }

    updateResult(drawNo)
    {
        let arr = model.getHistoryByDrawNo(drawNo);
        if(this.props.updateRes){
            this.props.updateRes(arr);
        }
        this.setState({
            drawNoHis:this.state.arrRes[this.state.idx].drawNoRef
        });
    }

    render() {
        return(
            <div className="sel-drawno">
                <div className="sel-container">
                    <img className='prev' src="img/mcPrev.png" width='auto' height='auto' onClick={this.prev.bind(this)}/>
                    <span>drawno: {this.state.drawNoHis}</span>
                    <img className='next' src="img/mcNext.png" width='auto' height='auto' onClick={this.next.bind(this)}/>
                </div>
            </div>
        )
    }
}
