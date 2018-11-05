/**
 * Created by carter on 9/27/2018.
 */
import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import DisplayUtil from '../util/DisplayUtil'
import RankPanel from "./RankPanel";
import CountDownPanel from "./CountDownPanel";
import {model} from '../../model/Model';
import {lobbyServer} from '../../controller/ServerLobby'
import Command from '../../constant/Command'

export default class TableLottery extends Component {
    constructor(props){
        super(props);
        this.tbInfo = this.props.tbInfo;
        this.data = null;
    }
    componentDidMount() {
        model.subscribe(Command.BET_RESULT, this);
        model.subscribe(Command.START_BET_LOBBY, this);
        model.subscribe(Command.STOP_BET_LOBBY, this);
        model.subscribe(Command.LAST_DRAW_RESULT, this);
        this.getResult();
    }

    componentWillUnmount(){
        this.mounted = false;
        model.unsubscribe(Command.BET_RESULT, this);
        model.unsubscribe(Command.START_BET_LOBBY, this);
        model.unsubscribe(Command.STOP_BET_LOBBY, this);
        model.unsubscribe(Command.LAST_DRAW_RESULT, this);
    }

    getResult(){
        lobbyServer.getLastDrawResult(this.tbInfo.id, "1");
    }

    updateBetResult(){
        this.refs.rank.updateRank(this.data);
    }

    startCountdown(){
        console.log('startCountdown', this.tbInfo.id);
        this.refs.countdown.startCountDown(this.data.countDown, this.data.drawNo);
    }

    stopCountdown(){
        console.log('stopCountdown', this.tbInfo.id);
        this.refs.countdown.stopCountDown(this.data.countDown, this.data.drawNo);
    }

    hdlOpenTb(e){
        model.update(Command.OPEN_TABLE, this.tbInfo.id);
    }



    update(command, data) {
        switch (command) {
            case Command.BET_RESULT:
                if(this.tbInfo.id != data.tableId) return;
                this.data = data;
                this.updateBetResult();
                break;
            case Command.LAST_DRAW_RESULT:
                if(this.tbInfo.id != data.tableId) return;
                this.data = data;
                this.updateBetResult();
                break;
            case Command.START_BET_LOBBY:
                if(this.tbInfo.id != data.tbId) return;
                this.data = data;
                this.startCountdown();
                break;
            case Command.STOP_BET_LOBBY:
                if(this.tbInfo.id != data.tbId) return;
                this.data = data;
                this.stopCountdown();
                break;
        }
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
