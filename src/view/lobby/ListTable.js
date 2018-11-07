/**
 * Created by carter on 9/27/2018.
 */
import React, {Component, PropTypes} from 'react';
import Table from './TableLottery'
import {model} from '../../model/Model'

export default class ListTable extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount() {

    }

    onClick(e){

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
            if (jsxCol.length > 2 || i == model.listTable.length-1) {
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