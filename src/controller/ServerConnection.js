
import WebsocketServer from './WebsocketServer';
import ServerConfig from '../config/ServerConfig';
import {model} from '../model/Model';
import WebsocketParser from './WebsocketParser';
import Command from '../constant/Command';
import EventType from '../constant/EventType';
import ErrorCode from '../constant/ErrorCode';
import GameUtil from '../view/util/GameUtil';

class ServerConnection {
    constructor() {
        this.server = null;
        this.serverStatus = null;
        this.parser = null;
        this.waitingList = null;
        this.waitingComlete = null;
        this.sessionId = "";
        this.isLobby = false;
    }
    /*public interface*/
    init(type) {
        switch (type) {
            case ServerConfig.SERVER_WS:
                this.server = new WebsocketServer();
                this.parser = new WebsocketParser();
                break;
        }
        if (this.server) {
            this.server.onConnection = this.onConnection.bind(this);
            this.server.onConnectionLost = this.onConnectionLost.bind(this);
            this.server.onLogin = this.onLogin.bind(this);
            this.server.onLoginError = this.onLoginError.bind(this);
            this.server.onExtensionResponse = this.onExtensionResponse.bind(this);
        }
    }

    connect(uname = "", upass = "") {
        if (uname != "" || upass != "") {
            model.loginName = uname;
            model.loginPass = upass;
        }
        this.server.connect( ServerConfig.serverPath, ServerConfig.serverPort );
    }

    login(isWaiting = false) {
        if (isWaiting) {
            this.waitingList.push(Command.SESSION);
        }
    }

    logout(status = "") {}
    closeConnect() {
        this.server.disconnect();
    }

    /*callback functions*/
    onConnection() {
        this.login();
    }
    onConnectionLost() {}
    onLogin() {
    }
    onLoginError(content) {}

    sendExtension(command, message, isWaiting = false) {
        if (isWaiting) {
            this.waitingList.push(command);
        }
        if (!message) {
            message = {};
        }
        message.sessionId = this.sessionId;
        this.server.sendExtension(command, message);
    }

    onExtensionResponse(command, result) {
        console.log('onExtensionResponse: ', "command", command, "data", result);
        let data = this.parser.parseResponse(command, result);
        if (command == Command.SESSION) {
            this.sessionId = data.result.sessionId;
        }
        model.updateData(command, data.result, this.isLobby);

        this.checkWaitingList(command);
    }

    startWaiting(callback) {
        this.waitingList = [];
        if (callback) {
            this.waitingComlete = callback;
        }
    }

    checkWaitingList(name) {
        if (!this.waitingList) {
            return;
        }
        let idx = this.waitingList.indexOf(name);
        if (idx != -1) {
            this.waitingList.splice(idx, 1);
        }
        if (this.waitingList.length == 0) {
            if (this.waitingComlete) {
                this.waitingList = null;
                this.waitingComlete();
            }
        }
    }

    checkResult(result, command = "") {
        if (!result) {
            return null;
        }
        let dataObj;
        try {
            dataObj = JSON.parse(result);
            switch (dataObj.errorMessage) {
                case ErrorCode.TOKEN_INVALID:
                case ErrorCode.REPEATED_LOGIN:
                case ErrorCode.SESSION_EXPIRED:
                case ErrorCode.SESSION_KICKOUT:
                case ErrorCode.SESSION_NOT_EXISTS:
                    console.log("check result error: ", dataObj.errorMessage);
                    return null;
            }
            if (dataObj.error != "0") {
                let arr = GameUtil.parseError(dataObj.errorMessage, false);
                let errName = arr[0];
                let errCode = arr[1];
                let errValue = arr[2];
                //let msg: string = errCode + Model.instance.getText(errName) + errValue;

                if (command == EventType.LOGIN_FAIL || command == Command.SERVER_KICKOUT) {
                    //this.doLogout(msg);
                } else {
                    //Model.instance.showMessageText(msg);
                }
                return null;
            }
            else {
                let data = dataObj.result;
                return data;
            }
        } catch (e) {
            if (command == EventType.LOGIN_FAIL) {
                //this.doLogout(result);
            }
        }
        return null;
    }

    ///////////////////////////////////////////////////////////////////////
    //						SERVER REQUEST								///
    ///////////////////////////////////////////////////////////////////////
    getPersonInfo(isWaiting = false) {
        this.sendExtension(Command.PERSON_INFO, null, isWaiting);
    }
    getGameLimit(isWaiting = false) {
        this.sendExtension(Command.GAME_LIMIT, null, isWaiting);
    }
    getTableListByUser(isWaiting = false) {
        this.sendExtension(Command.TABLE_LIST_BY_USER, {casinoId: ServerConfig.casinoId}, isWaiting);
    }
    getTableHistory(tableId, isWaiting = false) {
        this.sendExtension(Command.TABLE_HISTORY, {tableId}, isWaiting);
    }
    getRecentBetReport(tableId, page, ipp, isCountRow, isWaiting = false) {
        this.sendExtension(Command.REPORT_RECENT_BET, {tableId, page, ipp, isCountRow}, isWaiting);
    }
    getBettingReport(tableId, fromDate, toDate, pageNo, rowsPerPage, isCountRow, isWaiting = false) {
        this.sendExtension(Command.REPORT_BETTING, {tableId, fromDate, toDate, pageNo, rowsPerPage, isCountRow, language:model.language}, isWaiting);
    }
    getResultReport(tableId, date, pageNo, rowsPerPage, isCountRow, isWaiting = false) {
        this.sendExtension(Command.REPORT_RESULT, {tableId, date, pageNo, rowsPerPage, isCountRow, language:model.language}, isWaiting);
    }
    getTableInfo(tableId) {
        this.sendExtension(Command.TABLE_INFO, {tableId}, false);
    }
}
export default ServerConnection;
