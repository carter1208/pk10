/**
 * Created by carter on 10/22/2018.
 */
import React,{Component} from 'react';
import {T} from '../../model/language/Translator';

export default class ChipSettingItem extends Component{
    constructor(props){
        super(props);
        this.id = this.props.id;
    }

    componentDidMount() {

    }

    clear(e){
        let item = document.getElementById('text'+this.id);
        if(this.props.hdlDel)
            this.props.hdlDel(parseFloat(item.value));
    }
    insert(e){
        if(this.props.hdlInsert)
            this.props.hdlInsert();
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
        if(this.props.hdlChange)
            this.props.hdlChange(parseFloat(currentString));
    }

    render() {
        let objBtn = [];
        if(this.props.isFull){
            objBtn.push(
                <button key={Math.random()} type="button" id ='del' onClick={this.clear.bind(this)}>{T.translate('lbDel')}</button>
            );
        }else {
            objBtn.push(
                <div key={Math.random()}>
                    <button  key={Math.random()} type="button" id ='insert' onClick={this.insert.bind(this)}>{T.translate('lbInsert')}</button>&nbsp;
                    <button key={Math.random()} type="button" id ='del' onClick={this.clear.bind(this)}>{T.translate('lbDel')}</button>
                </div>
            );
        }
        return (
            <div className="chip-item">
                <input id={'text'+this.props.id} disabled={this.props.value > 0} defaultValue={this.props.value} onKeyPress={this.onChange.bind(this)} onBlur={this.onMoveLeave.bind(this)}></input>&nbsp;&nbsp;
                {objBtn}
            </div>
        )
    }
}

