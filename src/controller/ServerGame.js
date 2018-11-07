import ServerConnection from "./ServerConnection";
import {model} from '../model/Model';
import ServerConfig from '../config/ServerConfig';
import Command from "../constant/Command";
import ErrorCode from "../constant/ErrorCode";

class ServerGame extends ServerConnection {
    constructor() {
        super();
        this.sessionId = "0";
    }
    login() {
        this.tableId = model.tableId;
        let uname = model.loginName;
        let upass = model.loginPass;
        let zone = "Lo_" + this.tableId;
        let param = {};
        param["agentId"]      = ServerConfig.agentId;
        param["loginType"]    = ServerConfig.loginType;
        param["sessionId"]    = model.sessionId;
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
        this.server.login(uname, upass, zone, param);
    }

    logout(status="") {
        this.serverStatus = status;
        model.quitGame();
        this.closeConnect();
    }

    onConnectionLost() {
        if (!this.serverStatus) {
            this.serverStatus = "ConnectFail";
        }
        model.onServerGameDisconnect(this.serverStatus);
        this.serverStatus = "";
    }
}
export let gameServer = new ServerGame();
