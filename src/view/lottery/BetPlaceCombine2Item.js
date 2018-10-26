/**
 * Created by carter on 9/19/2018.
 */
import React,{Component} from 'react'
import GlobalState from './GlobalState'
import {model} from '../../model/Model'

export default class BetPlaceCombine2Item extends Component{
    constructor(props){
        super(props);
        this.currItem = null;
        this.state={
            color1:GlobalState[this.props.idItem] ? GlobalState[this.props.idItem].color1:'#999',
            value1:GlobalState[this.props.idItem] ? GlobalState[this.props.idItem].value1: 0,
            color2:GlobalState[this.props.idItem] ? GlobalState[this.props.idItem].color2:'#999',
            value2:GlobalState[this.props.idItem] ? GlobalState[this.props.idItem].value2 : 0,
            name:this.props.name,
            id:this.props.id,
            oddBetCode:this.props.oddBetCode
        };
    }

    getColor(id){
        let color = '123';
        switch(parseInt(id)){
            case 1:
                color = '#FFF429';
                break;
            case 2:
                color = '#0185EA';
                break;
            case 3:
                color = '#383838';
                break;
            case 4:
                color = '#FB6C00';
                break;
            case 5:
                color = '#1DF6FD';
                break;
            case 6:
                color = '#6428F8';
                break;
            case 7:
                color = '#DEE0E1';
                break;
            case 8:
                color = '#FE4141';
                break;
            case 9:
                color = '#870006';
                break;
            case 10:
                color = '#01E400';
                break;
        }
        if(this.currItem.id =='btn1'){
            this.state.value1=id;
            this.state.color1=color;
        }else {
            this.state.value2=id;
            this.state.color2=color;
        }

        for(let key in GlobalState){
            if(GlobalState[key].value1 == this.state.value1 && GlobalState[key].value2 == this.state.value2){
                alert('betcode is exist.');
                this.setState({
                    value1:'0',
                    value2:'0',
                    color1:'#999',
                    color2:'#999'
                });
                return;
            }
        }
        this.setState({});
        GlobalState[this.props.idItem].value1 = this.state.value1;
        GlobalState[this.props.idItem].value2 = this.state.value2;
        GlobalState[this.props.idItem].color1 = this.state.color1;
        GlobalState[this.props.idItem].color2 = this.state.color2;
}

    componentDidMount(){
        if(!GlobalState[this.props.idItem]){
            GlobalState[this.props.idItem] = this.state;
            GlobalState[this.props.idItem].value1 = 0;
            GlobalState[this.props.idItem].color1 = '#999';
            GlobalState[this.props.idItem].value2 = 0;
            GlobalState[this.props.idItem].color2 = '#999';
        }
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

    onClick(event){
        event.preventDefault();
        this.currItem = event.currentTarget;
        let exist = [parseInt(this.state.value1), parseInt(this.state.value2)]
        if(this.props.onClickItem){
            this.props.onClickItem(event, exist);
        }
    }

    onBlur(event){
        event.stopPropagation();
        if(this.props.onBlurItem){
            this.props.onBlurItem(event);
        }
    }
    onClickBet(e){
        e.preventDefault();
        this.state.name = this.state.value1 + '' + this.state.value2;
        this.betCode = "Lo" + this.state.name;
        this.betInfo = model.getBetPlaceInfo(this.betCode);
        if(this.props.onClickBet)
            this.props.onClickBet(e);
    }

    getValue(){
        if(this.state.value1 != 0 && this.state.value2 !=0){
            this.state.name = this.state.value1 + '' + this.state.value2;
            this.betCode = "Lo" + this.state.name;
            this.betInfo = model.getBetPlaceInfo(this.betCode);

            let input = document.getElementById('value'+this.props.idItem);
            input.value = this.betInfo.tempValue;
            this.setBgColor(this.betInfo.tempValue);
        }
    }

    setBgColor(currentString){
        let item = document.getElementById(this.props.idItem)
        if(parseFloat(currentString) > 0){
            $(item).addClass('hasValue');
            this.betInfo.tempValue = parseFloat(currentString);
        }else{
            $(item).removeClass('hasValue');
            this.betInfo.tempValue = 0;
        }
    }

    getOdd(){
        if(!model.objCombine2){
            return;
        }
        if(!(model.objCombine2.isOnline == 1)) {
            let item = document.getElementById(this.props.idItem)
            $(item).addClass('disable')
        }
        this.setState({
            oddBetCode:parseFloat(model.objCombine2.oddValue)
        });
    }

    render(){
        let jsx = ( <div className="dropCb" id="btn1" tabIndex={0} onClick={this.onClick.bind(this)} onBlur={this.onBlur.bind(this)}>
            <div className="btn"><div ref='drop1' className="title" style={{backgroundColor:this.state.color1}}>{this.state.value1}</div>
                <span className="caret"></span></div>
        </div>);
         let jsx1 = (  <div className="dropCb" id="btn2" tabIndex={0} onClick={this.onClick.bind(this)} onBlur={this.onBlur.bind(this)}>
             <div className="btn drop2"><div className="title"style={{backgroundColor:this.state.color2}}>{this.state.value2}</div>
                 <span className="caret"></span></div>
         </div>);

        return(
            <div className={'combine2'} id={this.props.idItem}>
                <div className={'name1'} id="title">1ST</div>
                {jsx}
                <div className={'name1'} id="title">2ND</div>
                {jsx1}
                <div className="odd">{this.state.oddBetCode}</div>
                <input type="text" className='value' id={'value'+this.props.idItem} onClick={this.onClickBet.bind(this)} onKeyPress={this.onChange.bind(this)} onBlur={this.onMoveLeave.bind(this)} tabIndex={this.state.idx} defaultValue={0} disabled={(this.state.value1 == 0 || this.state.value2 ==0)}></input>
            </div>
        )
    }
}
