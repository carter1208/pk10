/**
 * Created by carter on 9/19/2018.
 */
import React,{Component} from 'react'
import {model} from '../../model/Model'
export default class BetPlaceDtItem extends Component{
    constructor(props){
        super(props);
        this.state ={
            name:this.props.name,
            id:this.props.id,
            oddBetCode:this.props.oddBetCode
        };
    }

    componentDidMount(){
        this.getOdd();
        this.getValue();
    }

    onChange(event){
        let currentString = event.currentTarget.value;
        if(currentString == 0) currentString = '';
        currentString = currentString.replace(/[^0-9\.]/g,'');
        event.currentTarget.value = currentString;
        if ((event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
    }
    onMoveLeave(event){
        let currentString = event.currentTarget.value;
        if(currentString == '') currentString = 0;
        event.currentTarget.value = currentString;
        this.setBgColor(currentString);
        if(this.props.onBlurBet){
            this.props.onBlurBet(event);
        }
    }
    onClick(e){
        e.preventDefault();
        if(this.props.onClickBet)
            this.props.onClickBet(e);
    }

    getValue(){
        this.betCode = "Lo" + this.state.name;
        this.betInfo = model.getBetPlaceInfo(this.betCode);

        let input = document.getElementById('value'+this.state.name);
        input.value = this.betInfo.tempValue;
        this.setBgColor(this.betInfo.tempValue);
    }

    setBgColor(currentString){
        let item = document.getElementById('dt' + this.state.name)
        if(parseFloat(currentString) > 0){
            $(item).addClass('hasValue');
            this.betInfo.tempValue = parseFloat(currentString);
        }else{
            $(item).removeClass('hasValue');
            this.betInfo.tempValue = 0;
        }
    }

    getOdd(){
        this.betCode = "Lo" + this.state.name;
        this.betInfo = model.getBetPlaceInfo(this.betCode);
        if(!this.betInfo){
            return;
        }
        if(!this.betInfo.isOnline) {
            let item = document.getElementById('dt' + this.state.name)
            $(item).addClass('disable')
        }
        this.setState({
            oddBetCode:this.betInfo.oddValue
        });
    }

    render(){
        return(
            <div className={'dt'} id={'dt'+this.state.name}>
                <div className={'name' + this.state.id} id="title">{this.state.id}</div>
                <div className="odd">{this.state.oddBetCode}</div>
                <input type="text" className='value' id={'value'+this.state.name} onClick={this.onClick.bind(this)} onKeyPress={this.onChange.bind(this)} onBlur={this.onMoveLeave.bind(this)} tabIndex={this.props.idx} defaultValue={0}></input>
            </div>
        )
    }
}

