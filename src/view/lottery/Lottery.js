/**
 * Created by carter on 9/27/2018.
 */
import React, {Component, PropTypes} from 'react';
import Game from '../game/Game'
import TopPanel from '../lobby/TopPanel'
import BettingPanel from './BettingPanel'
import {model} from '../../model/Model'
import {gameServer} from '../../controller/ServerGame'
import LeftMenu from "../common/LeftMenu";
import Command from "../../constant/Command";
import ResultStat from "./ResultStat";
import PopupContainer from '../../component/PopupContainer'
import TableHistory from "../common/TableHistory";
import ReportPanel from "../common/ReportPanel";
import GameMenu from "../common/GameMenu";
import * as PIXI from 'pixi.js';

export default class Lottery extends Component {
    constructor(props) {
        super(props);
        model.tableId = this.props.tbID;
        this.isFirst = true;
        this.state = {
            tbID: this.props.tbID,
            isShow:false,
            arrRes:[]
        }
    }
    componentDidMount() {
        model.clientReady = false;
        model.subscribe(Command.TABLE_HISTORY, this);

        this.onConnectGame();
    }
    componentWillUnmount() {
        this.mounted = false;
        model.unsubscribe(Command.TABLE_HISTORY, this);
    }

    onConnectGame(){
        gameServer.startWaiting(() => this.onConnectSuccessHandler());
        gameServer.connect(model.loginName, model.loginPass);
    }

    onConnectSuccessHandler(){
        gameServer.startWaiting(() => this.onLoadInfoCompleteHandler())
        gameServer.getTableInfo(this.state.tbID, true);
        model.initBetCode();
        gameServer.getOddDefault(this.state.tbID, true);
        gameServer.getOddLive(this.state.tbID, true);
    }

    onLoadInfoCompleteHandler(){
        model.clientReady = true;
        this.setState({isShow:true});
        gameServer.getStart(this.state.tbID, false);
        gameServer.getTableHistory(this.state.tbID, false);
        gameServer.getServerDate(false);
        model.arrChipValue = new Array (
            1, 2, 5,
            10, 20, 50,
            100, 200, 500,
            1000, 2000, 5000,
            10000, 20000, 50000,
            100000, 200000, 500000,
            1000000, 2000000, 5000000,
            10000000, 20000000, 50000000
        );
        this.refs.bettingPanel.init();
    }

    removeState(){
        this.refs.gameContainer.removeState();
        this.setState({isShow:false});
    }

    update(command, data) {
        switch (command) {
            case Command.TABLE_HISTORY:
                if (!this.isFirst)
                    return;
                this.refs.tbHistory.updateHistory();
                this.setState({
                    arrRes:model.table.history.getHistory
                });
                this.isFirst = false;
                break;
        }
    }

    render() {
        if(!this.state.isShow){
            return <div></div>
        }
        return (
            <div className="game-container">
                <TopPanel tbID={this.state.tbID}/>
                <div style={{display:'flex'}}>
                    <div className="left" style={{float:'left'}}>
                        <LeftMenu/>
                        <ResultStat arrRes={this.state.arrRes}/>
                        <GameMenu/>
                    </div>
                    <div className="center" style={{float:'center', width:'830px', height:'880px', marginLeft:'20px'}}>
                        <Game ref="gameContainer"/>
                        <BettingPanel ref="bettingPanel"/>
                        <TableHistory ref='tbHistory'/>
                    </div>
                    <div className="right" style={{float:'right'}}>
                        <ReportPanel/>
                    </div>
                </div>
                <PopupContainer/>
            </div>
        )
    }
}