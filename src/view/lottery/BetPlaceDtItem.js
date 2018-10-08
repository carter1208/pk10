/**
 * Created by carter on 9/19/2018.
 */
import React,{Component} from 'react'
export default class BetPlaceDtItem extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
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
        if(this.props.onBlurBet){
            this.props.onBlurBet(event);
        }
    }
    onClick(e){
        e.preventDefault();
        if(this.props.onClickBet)
            this.props.onClickBet(e);
    }

    render(){
        return(
            <div className={'dt'}>
                <div className={'name' + this.props.id} id="title">{this.props.id}</div>
                <div className="odd">{this.props.oddBetCode}</div>
                <input type="text" className='value' onClick={this.onClick.bind(this)} onKeyPress={this.onChange.bind(this)} onBlur={this.onMoveLeave.bind(this)} tabIndex={this.props.id} defaultValue={0}></input>
            </div>
        )
    }
}

