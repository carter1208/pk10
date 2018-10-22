/**
 * Created by carter on 10/22/2018.
 */
import React,{Component} from 'react';
import {model} from '../../model/Model'
import ChipSettingItem from "./ChipSettingItem";
import Command from "../../constant/Command";
export default class ChipSettingPanel extends Component{
    constructor(props){
        super(props);
        this.state = {
            arrDefault:[1,10,20,50,100,200],
            arrSelect:[],
            arrNormal:[],
            arrTemp:[],
            isShow:false
        }
    }

    componentDidMount() {
    }

    show(e){
        this.setState({
            isShow:true
        });
    }

    clearBet(e){

    }

    confirmBet(e){
        document.getElementById('save').style.visibility = 'visible';
        setTimeout("document.getElementById('save').style.visibility = 'hidden'", 2000);
    }
    close(e){
        this.setState({
            isShow:false
        });
    }

    render() {
        if(!this.state.isShow)
            return(<div></div>);
        let jsxCol = [];
        let obj;
        let isFull;
        for (let i = 0; i < this.state.arrDefault.length; i++){
            obj = this.state.arrDefault[i];
            isFull = (this.state.arrDefault.length < 6 && i == this.state.arrDefault.length-1) ? false : true;
            jsxCol.push(
                <ChipSettingItem key={Math.random()} isFull={isFull} value={obj}/>
            );
        }
        return (
            <div className="chip-setting-panel">
                <div className="container">
                    <div className="header">
                        <span>Chip Setting</span>
                        <img src="img/close.png" width='21' height='20' onClick={this.close.bind(this)}/>
                    </div>
                    <span>Note: Setting are only saved on your comprter.Clearing the browser cache or changing the computer will show the default value</span>
                    <div className="content">
                        {jsxCol}
                    </div>
                    <div className="footer">
                        <button type="button" id ='save' onClick={this.confirmBet.bind(this)}>Save</button>&nbsp;
                        <button type="button" id ='clear' onClick={this.clearBet.bind(this)}>Clear</button>
                    </div>
                    <span id="save" style={{visibility:'hidden', color:'#db2222'}}>Save successful</span>
                </div>
            </div>
        )
    }
}
