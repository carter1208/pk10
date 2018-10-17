/**
 * Created by carter on 9/27/2018.
 */
import React, {Component, PropTypes} from 'react';
import Game from '../game/Game'
import TopPanel from '../lobby/TopPanel'
import BettingPanel from './BettingPanel'
import {model} from '../../model/Model'
import {gameServer} from '../../controller/GameServer'
import LeftMenu from "../common/LeftMenu";

export default class Lottery extends Component {
    constructor(props) {
        super(props);
        model.tableId = this.props.tbID;
        this.state = {
            tbID: this.props.tbID,
            isShow:false
        }
    }
    componentDidMount() {
        this.onConnectGame();
    }
    componentWillUnmount() {
    }

    onConnectGame(){
        gameServer.startWaiting(this.onConnectSuccessHandler.bind(this));
        gameServer.connect(model.loginName, model.loginPass);
    }

    onConnectSuccessHandler(){
        gameServer.startWaiting(this.onLoadInfoCompleteHandler.bind(this))
        gameServer.getTableInfo(true);
        model.initBetCode();
        gameServer.getOddDefault(this.state.tbID, true);
        gameServer.getOddLive(this.state.tbID, true);
    }

    onLoadInfoCompleteHandler(){
        console.log("init...");
        gameServer.getStart(this.state.tbID, false);
        gameServer.getTableHistory(this.state.tbID, false);
        gameServer.getServerDate(false);

        this.setState({isShow:true});
    }

    render() {
        if(!this.state.isShow){
            return <div></div>
        }
        return (
            <div className="game-container">
                <TopPanel/>
                <div style={{display:'flex'}}>
                    <div className="left" style={{float:'left'}}>
                        <LeftMenu/>
                    </div>
                    <div className="center" style={{float:'center', width:'830px', paddingLeft:'20px'}}>
                        <Game/>
                        <BettingPanel/>
                    </div>
                    <div className="right" style={{float:'right'}}>
                        right
                    </div>
                </div>
            </div>
        )
    }
}