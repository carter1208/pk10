/**
 * Created by carter on 9/27/2018.
 */
import ServerConnection from "./ServerConnection";
import {model} from '../model/Model';
import ServerConfig from '../config/ServerConfig';
class LobbyServer extends ServerConnection {
    constructor() {
        super();
        this.sessionId = "0";
        this.tableId = "0";
        this.isLobby = true;
    }

    login(isWaiting = false) {
        let uname = model.loginName;
        let upass = model.loginPass;
        let param = {};
        param["agentId"]    = ServerConfig.agentId;
        param["loginType"]    = ServerConfig.loginType;
        param["sessionId"]    = this.sessionId;
        param["language"]     = model.language;
        param["apiToken"]     = model.apiToken;
        param["gameMode"]     = model.gameMode;
        param["isMain"]       = ServerConfig.isMain;
        param["siteName"]     = ServerConfig.siteName;
        param["ip"]           = ServerConfig.ip;
        param["countryCode"]  = ServerConfig.countryCode;
        param["loginTypeId"]  = ServerConfig.loginTypeId;
        param["parentSID"]    = ServerConfig.parentSID;
        param["tableId"]      = this.tableId;
        param["casinoID"]     = ServerConfig.casinoId;
        this.server.login(uname, upass, model.gameType+"_"+this.tableId, param);
    }

    logout(status = "") {
        this.serverStatus = status;
        model.logout();
        this.closeConnect();
    }
    onConnectionLost() {
        if (!this.serverStatus) {
            this.serverStatus = "ConnectFail";
        }
        model.onServerLobbyDisconnect(this.serverStatus);
        this.serverStatus = "";
    }
}

export let lobbyServer = new LobbyServer();