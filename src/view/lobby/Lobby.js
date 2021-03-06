/**
 * Created by carter on 9/27/2018.
 */
import React, {Component, PropTypes} from 'react';
import {lobbyServer} from '../../controller/ServerLobby'
import {model} from '../../model/Model'
import MainPage from "./MainPage";
import ServerConfig from "../../config/ServerConfig";

export default class Lobby extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin:this.props.isLogin,
            sence: this.props.isLogin? 'Lobby':'Main'
        }
    }
    componentDidMount() {
        if(this.state.isLogin)
            this.onLogin();
    }
    componentWillUnmount() {
    }

    onLogin(){
        model.loginName = 'testpk10100';
        ServerConfig.agentId = '23947';
        model.loginPass = '123456';
        lobbyServer.startWaiting(() => this.onConnectSuccessHandler());
        lobbyServer.connect(model.loginName, model.loginPass);
    }
    onConnectSuccessHandler(){
        lobbyServer.startWaiting(() => this.onLoadInfoCompleteHandler())
        lobbyServer.getTableListByUser(true);
        lobbyServer.getPersonInfo(true);
        lobbyServer.getGameLimit(true);
    }
    onLoadInfoCompleteHandler(){
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