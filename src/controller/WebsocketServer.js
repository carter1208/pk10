/**
 * Created by loc on 6/8/2017.
 */
const CONTROLLER_KEY    = "cid";
const REQUEST_KEY       = "rid";
const MESSAGE_KEY       = "mes";
const COMMAND_KEY       = "c";
const EXTDATA_KEY       = "p";
const ERROR_CODE_KEY    = "ec";
const ERROR_CONTENT_KEY = "ep";

const CID_SYSTEM        = 0;
const CID_EXTEND        = 1;

const RID = {
    LOGIN: 1,
    LOGOUT: 2,
    JOINT_ROOM: 4,
    CREATE_ROOM: 6,
    EXTENSION: 13,
    LEAVE_ROOM: 14,
    ON_USER_ENTER_ROOM: 41,
    ON_USER_LOST: 43,
    ON_ROOM_LOST: 44,
    ON_USER_LEAVE_ROOM: 45
}

export default class WebsocketServer {
    constructor() {
    }

    /*public interface*/
    /*
    * @param: data = {serverPath, serverPort}
    * */
    connect(path, port, param = "") {
        let url = 'ws://' + path + ':' + port + '/' + param;
        this.ws = new WebSocket(url);

        this.ws.onopen = (e) => {
            this.onSocketOpen(e);
        };
        this.ws.onclose = (e) => {
            this.ws = null;
            this.onSocketClose(e);
        };
        this.ws.onmessage = (e) => {
            this.onSocketMessage(e);
        };
        this.ws.onerror = (e) => {
            this.onSocketError(e);
        };
    }

    disconnect() {
        if (this.ws && this.ws.readyState == WebSocket.OPEN) {
            this.ws.close();
            return true;
        }
        return false;
    }

    login(uname, upass, zone, param) {
        if (this.ws && this.ws.readyState == WebSocket.OPEN) {
            let mes = {};
            mes["un"] = uname;
            mes["pw"] = upass;
            mes["zn"] = zone;
            mes["ld"] = param;
            this.send(RID.LOGIN, mes);
        }
    }
    logout() {
        this.send(RID.LOGOUT, {});
    }
    joinRoom(data) {
        this.send(RID.JOINT_ROOM, data);
    }
    createRoom(data) {
        this.send(RID.CREATE_ROOM, data);
    }
    sendExtension(command, data) {
        this.send(RID.EXTENSION, data, command);
    }

    send(rid, mes, cmd="") {
        let isExt = (rid == RID.EXTENSION);
        let mesExt = {};
        if (isExt) {
            mesExt[COMMAND_KEY] = cmd;
            mesExt[EXTDATA_KEY] = mes;
        } else {
            mesExt = mes;
        }
        let req = new JSObject(isExt ? CID_EXTEND : CID_SYSTEM, rid, mesExt);
        if (this.ws && this.ws.readyState == WebSocket.OPEN) {
            console.log('requestSystem', req.toJson());
            return this.ws.send(req.toJson());
        } else {
            throw 'INVALID_STATE_ERR : Pausing to reconnect websocket';
        }
    }

    //////////////////////////////
    //  CONNECTION STATUS
    //////////////////////////////
    onSocketOpen(e) {
        this.onConnection();
    }
    onSocketClose(e) {
        this.onConnectionLost();
        console.log('onSocketClose: ', e.reason);
    }
    onSocketError(e) {
        this.onConnectionError(e);
        console.log('onSocketError: ', e);
    }
    onSocketMessage(e) {
        // console.log('onSocketMessage: ', e.data);
        let data = e.data;
        let obj = JSON.parse(data);
        let controllerId = Number(obj[CONTROLLER_KEY]);
        let requestId = Number(obj[REQUEST_KEY]);
        let content = obj[MESSAGE_KEY];
        if (controllerId == CID_SYSTEM) {
            this.internalMessageHandler(requestId, content);
        }
        else if (controllerId == CID_EXTEND) {
            let cmd = content[COMMAND_KEY];
            let jObject = content[EXTDATA_KEY];
            this.extensionMessageHandler(cmd, jObject);
        }
        else {
            console.log("CONTROLLER NOT SUPPORT.");
        }
    }
    /////////////////////////////////////
    //  SERVER RESPONSE
    /////////////////////////////////////

    internalMessageHandler(rId, data) {
        console.log("internalMessageHandler: ", rId, data);
        switch (rId) {
            case RID.LOGIN:
                if (data[ERROR_CONTENT_KEY] != undefined) {
                    this.onLoginError(data[ERROR_CONTENT_KEY]);
                } else {
                    this.onLogin(data);
                }
        }
    }
    extensionMessageHandler(command, data) {
        this.onExtensionResponse(command, data);
    }

}
WebsocketServer.prototype.onConnection = null;
WebsocketServer.prototype.onConnectionLost = null;
WebsocketServer.prototype.onConnectionError = null;
WebsocketServer.prototype.onLogin = null;
WebsocketServer.prototype.onLoginError = null;
WebsocketServer.prototype.onExtensionResponse = null;

class JSObject {
    constructor(cid, rid, data) {
        this[CONTROLLER_KEY] = cid;
        this[REQUEST_KEY] = rid;
        this[MESSAGE_KEY] = data;
    }
    toJson() {
        let obj = {};
        obj[CONTROLLER_KEY] = this[CONTROLLER_KEY];
        obj[REQUEST_KEY] = this[REQUEST_KEY];
        obj[MESSAGE_KEY] = this[MESSAGE_KEY];
        return JSON.stringify(obj);
    }
    toString() {
        let rs = "";
        rs += " controllerId: " + this.cid.toString() + "\r\n";
        rs += " requestId: " + this.rid.toString() + "\r\n";
        rs += " content: " + this.data.toString();
        return rs;
    }
}
