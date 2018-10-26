/**
 * Created by carter on 9/27/2018.
 */
import React, {Component, PropTypes} from 'react';
import Table from './TableLottery'
import {model} from '../../model/Model'
import Command from '../../constant/Command'

export default class ListTable extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount() {
        model.subscribe(Command.BET_RESULT, this);
        model.subscribe(Command.START_BET_LOBBY, this);
        model.subscribe(Command.STOP_BET_LOBBY, this);
    }

    onClick(e){

    }


    update(command, data) {
        switch (command) {
            case Command.BET_RESULT:
                this.refs['tb' + data.tableId].updateBetResult(data);
                break;
            case Command.START_BET_LOBBY:
                this.refs['tb' + data.tbId].startCountdown(data);
                break;
            case Command.STOP_BET_LOBBY:
                this.refs['tb' + data.tbId].stopCountdown(data);
                break;
        }
    }

    render() {
        let jsxRow = [];
        let jsxCol = [];
        let logoID = '';
        let tbInfo = null;
        for (var i = 0; i < model.listTable.length; i++){
            if (jsxCol.length > 0) {
                jsxCol.push(<div key={'spacex'+ (i+ 1)} className="space-x"/>);
            }
            tbInfo = model.listTable[i];
            logoID = 'img/logo'+tbInfo.id+'.png';
            jsxCol.push(
                <Table ref={'tb'+ tbInfo.id} key={i+ 1} onClick={this.onClick.bind(this, (i+ 1))} logo={logoID} tbInfo={tbInfo}/>
            );
            if (jsxCol.length > 2 || i == 3) {
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
            <div className="list-tb">
                {jsxRow}
            </div>
        )
    }
}