/**
 * Created by carter on 9/21/2018.
 */
import React,{Component} from 'react'

import GlobalState from './GlobalState'
export default class BetPlaceCombine3Item extends Component{
    constructor(props){
        super(props);
        this.currItem = null;
        this.state={
            color1:GlobalState[this.props.idItem] ? GlobalState[this.props.idItem].color1:'#999',
            value1:GlobalState[this.props.idItem] ? GlobalState[this.props.idItem].value1: 0,
            color2:GlobalState[this.props.idItem] ? GlobalState[this.props.idItem].color2:'#999',
            color3:GlobalState[this.props.idItem] ? GlobalState[this.props.idItem].color3:'#999',
            value2:GlobalState[this.props.idItem] ? GlobalState[this.props.idItem].value2 : 0,
            value3:GlobalState[this.props.idItem] ? GlobalState[this.props.idItem].value3 : 0
        };
    }

    componentDidMount(){
        if(!GlobalState[this.props.idItem]){
            GlobalState[this.props.idItem] = this.state;
            GlobalState[this.props.idItem].value1 = 0;
            GlobalState[this.props.idItem].color1 = '#999';
            GlobalState[this.props.idItem].value2 = 0;
            GlobalState[this.props.idItem].color2 = '#999';
            GlobalState[this.props.idItem].value3 = 0;
            GlobalState[this.props.idItem].color3 = '#999';
        }
    }

    getColor(id) {
        let color = '123';
        switch (parseInt(id)) {
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
        if (this.currItem.id == 'btn1') {
            this.state.value1 = id;
            this.state.color1 = color;
        } else if (this.currItem.id == 'btn2') {
            this.state.value2 = id;
            this.state.color2 = color;
        }
        else {
            this.state.value3 = id;
            this.state.color3 = color;
        }
        this.setState({});
        GlobalState[this.props.idItem].value1 = this.state.value1;
        GlobalState[this.props.idItem].value2 = this.state.value2;
        GlobalState[this.props.idItem].value3 = this.state.value3;
        GlobalState[this.props.idItem].color1 = this.state.color1;
        GlobalState[this.props.idItem].color2 = this.state.color2;
        GlobalState[this.props.idItem].color3 = this.state.color3;
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
    }
    onClick(event){
        event.preventDefault();
        this.currItem = event.currentTarget;
        let exist = [parseInt(this.state.value1), parseInt(this.state.value2), parseInt(this.state.value3)]
        event.preventDefault();
        if(this.props.onClickItem){
            this.props.onClickItem(event, exist);
        }
    }

    onBlur(event){
        event.preventDefault();
        if(this.props.obBlurItem){
            this.props.obBlurItem(event);
        }
        if(this.props.obBlurBet){
            this.props.obBlurBet(event);
        }
    }

    onClickBet(e){
        e.preventDefault();
        if(this.props.onClickBet)
            this.props.onClickBet(e);
    }

    render(){
        return(
            <div className={'combine3'} id={this.props.idItem}>
                <div className={'name1'} id="title">1ST</div>
                <div className="dropCb" id="btn1" tabIndex={0} onClick={this.onClick.bind(this)} onBlur={this.onBlur.bind(this)}>
                    <div className="btn"><div ref='drop1' className="title" style={{backgroundColor:this.state.color1}}>{this.state.value1}</div>
                        <span className="caret"></span></div>
                </div>
                <div className={'name1'} id="title">2ND</div>
                <div className="dropCb" id="btn2" tabIndex={0} onClick={this.onClick.bind(this)} onBlur={this.onBlur.bind(this)}>
                    <div className="btn"><div ref='drop2' className="title" style={{backgroundColor:this.state.color2}}>{this.state.value2}</div>
                        <span className="caret"></span></div>
                </div>
                <div className={'name1'} id="title">3RD</div>
                <div className="dropCb" id="btn3" tabIndex={0} onClick={this.onClick.bind(this)} onBlur={this.onBlur.bind(this)}>
                    <div className="btn"><div ref='drop3' className="title" style={{backgroundColor:this.state.color3}}>{this.state.value3}</div>
                        <span className="caret"></span></div>
                </div>
                <div className="odd">{this.props.oddBetCode}</div>
                <input type="text" className='value' onKeyPress={this.onChange.bind(this)} onClick={this.onClickBet.bind(this)} onBlur={this.onMoveLeave.bind(this)} tabIndex={this.props.id} defaultValue={0} disabled={(this.state.value1 == 0 || this.state.value2 ==0 || this.state.value3 ==0)}></input>
            </div>
        )
    }
}
