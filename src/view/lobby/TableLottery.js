/**
 * Created by carter on 9/27/2018.
 */
import React, {Component, PropTypes} from 'react';
import DisplayUtil from '../util/DisplayUtil'
import RankPanel from "./RankPanel";
import CountDownPanel from "./CountDownPanel";
import {model} from '../../model/Model';
import Command from '../../constant/Command'

export default class TableLottery extends Component {
    constructor(props){
        super(props);
        this.tbInfo = this.props.tbInfo;
    }
    componentDidMount() {
    }

    updateBetResult(data){
        this.refs.rank.updateRank(data.numbers)
    }

    startCountdown(data){
        console.log('startCountdown', this.tbInfo.id);
        this.refs.countdown.startCountDown(data.countDown, data.drawNo);
    }

    stopCountdown(data){
        console.log('stopCountdown', this.tbInfo.id);
        this.refs.countdown.stopCountDown(data.countDown, data.drawNo);
    }

    hdlOpenTb(e){
        model.update(Command.OPEN_TABLE, this.tbInfo.id);
    }

    render() {
        return (
            <div className="tb-lo" style={DisplayUtil.backgroundStyle('./img/bgTable.png')} onClick={this.hdlOpenTb.bind(this)}>
                <img className="logo" src={this.props.logo} width='auto' height='auto'></img>
                <CountDownPanel ref="countdown"/>
                <RankPanel ref="rank"/>
            </div>
        )
    }
}
