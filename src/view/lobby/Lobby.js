/**
 * Created by carter on 9/27/2018.
 */
import React, {Component, PropTypes} from 'react';
import {lobbyServer} from '../../controller/ServerLobby'
import {model} from '../../model/Model'
import MainPage from "./MainPage";

export default class Lobby extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sence: 'Lobby'
        }
    }
    componentDidMount() {

        this.onLogin();
    }
    componentWillUnmount() {
    }

    onLogin(){
        model.loginName = 'rubby';
        model.loginPass = '123456';
        lobbyServer.startWaiting(this.onConnectSuccessHandler.bind(this));
        lobbyServer.connect(model.loginName, model.loginPass);
    }
    onConnectSuccessHandler(){
        lobbyServer.startWaiting(this.onLoadInfoCompleteHandler.bind(this))
        lobbyServer.getTableListByUser(true);
        lobbyServer.getPersonInfo(true);
        lobbyServer.getGameLimit(true);
    }
    onLoadInfoCompleteHandler(){
        console.log("init...");
        this.setState({sence:'Main'});
    }

    render() {
        let jxs = this.state.sence == 'Lobby' ? null : <MainPage/>
        return (
            <div className="lobby-container">
                {jxs}
            </div>
        )
    }
}