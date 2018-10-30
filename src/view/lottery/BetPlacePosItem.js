/**
 * Created by carter on 9/14/2018.
 */
import React,{Component} from 'react'
import {model} from '../../model/Model'
export default class BetPlacePosItem extends Component{
    constructor(props){
        super(props);
        this.betCode = '';
        this.state ={
            name:this.props.name,
            id:this.props.id,
            isOnline:true,
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

    setBgColor(currentString){
        let item = document.getElementById('pos' + this.state.name)
        if(parseFloat(currentString) > 0){
            $(item).addClass('hasValue');
            this.betInfo.tempValue = parseFloat(currentString);
        }else{
            $(item).removeClass('hasValue');
            this.betInfo.tempValue = 0;
        }
    }
    onClick(event){
        event.preventDefault();
        if(this.props.onClickBet)
            this.props.onClickBet(event);
    }

    getValue(){
        if (!isNaN(this.state.name)){
            if (parseFloat(model.subMenu) == 10 && parseFloat(this.state.name) == 10){
                this.betCode = "Lo" + model.subMenu + this.state.name;
            }
            else
            {
                this.betCode = "Lo" + model.subMenu + "-" + this.state.name;
            }
        }
        else
        {
            this.betCode = "Lo" + model.subMenu + this.state.name;
        }
        this.betInfo = model.getBetPlaceInfo(this.betCode);

        let input = document.getElementById('value'+this.state.name);
        input.value = this.betInfo.tempValue;
        this.setBgColor(this.betInfo.tempValue);
    }

    getOdd(){
        if (!isNaN(this.state.name)){
            if (parseFloat(model.subMenu) == 10 && parseFloat(this.state.name) == 10){
                this.betCode = "Lo" + model.subMenu + this.state.name;
            }
            else
            {
                this.betCode = "Lo" + model.subMenu + "-" + this.state.name;
            }
        }
        else
        {
            this.betCode = "Lo" + model.subMenu + this.state.name;
        }
        this.betInfo = model.getBetPlaceInfo(this.betCode);
        if(!this.betInfo.isOnline) {
            let item = document.getElementById('pos' + this.state.name)
            $(item).addClass('disable')
            let value = document.getElementById('value' + this.state.name)
            value.disabled= true;
        }
        if(!this.betInfo){
            return;
        }
        this.setState({
            oddBetCode:this.betInfo.oddValue
        });
    }

    render(){
        let txt = 'title'
        if(isNaN(this.state.id)){
            txt = 'title-txt';
        }
        return(
            <div className={'pos'} id={'pos'+this.state.name}>
                <div className={'name' + this.state.id} id={txt}>{this.state.id}</div>
                <div className="odd">{this.state.oddBetCode}</div>
                <input type="text" className="value" id={'value'+this.state.name} onClick={this.onClick.bind(this)} onKeyPress={this.onChange.bind(this)} onBlur={this.onMoveLeave.bind(this)} tabIndex={this.props.idx} defaultValue={0}></input>
            </div>
        )
    }
}
