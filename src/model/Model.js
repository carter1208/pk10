/**
 * Created by carter on 9/27/2018.
 */
import Subject from '../observer/Subject';
import Command from '../constant/Command';
import UserInfo from './UserInfo';
import TableInfo from './TableInfo';
import ResultInfo from './ResultInfo';
class Model extends Subject {
    get listCasino() {
        return this._listCasino;
    }
    get listGameType(){
        return this._listGameType;
    }
    get listTable(){
        return this._listTable;
    }
    constructor() {
        super();
        this.gameMode = 's';
        this.gameType = "Pk10";
        this.language = "E";
        this.apiToken = "";
        this.loginName = "";
        this.loginPass = "";
        this.casinoVisible = "";
        this._listCasino = [];
        this._listGameType = [];
        //test
        this._objOpen = {};
    }

    checkVisibleCasino(casinoId) {
        let arrCasinoVisible = null;
        if (this.casinoVisible == "") {
            return true;
        }
        arrCasinoVisible = this.casinoVisible.split("@");
        for (let i = 0; i < arrCasinoVisible.length; i++) {
            if (casinoId == arrCasinoVisible[i]) {
                return true;
            }
        }
        return false;
    }

    checkExistCasino(casinoID) {
        if (!this.listCasino) {
            return false;
        }
        for (let i = 0; i < this.listCasino.length; i++) {
            if (this.listCasino[i] == casinoID) {
                return true;
            }
        }
        return false;
    }

    checkExistGameType(gameType) {
        if (!this.listGameType) {
            return false;
        }
        for (let i = 0; i < this.listGameType.length; i++) {
            if (this.listGameType[i] == gameType) {
                return true;
            }
        }
        return false;
    }

    updateData(command, data, isLobby) {
        switch (command) {
            case Command.SESSION:
                this.oIsUseBonusBal = data.oIsUseBonusBal;
                break;
            case Command.TABLE_LIST_BY_USER:
                this._listCasino = [];
                this._listGameType = [];
                this._listTable = [];
                let dataResult = $.map(data, function(value, index) {
                    return [value];
                });
                for (let i = 0; i < dataResult.length; i++) {
                    let obj = dataResult[i];
                    let tb;
                    let casino = this.checkExistCasino(dataResult[i]['RoomID']); // only add casinoid
                    let gameType = this.checkExistGameType(dataResult[i]['GameTpCode']);
                    if (this.checkVisibleCasino(dataResult[i]['RoomID'])) {
                        if (!casino) {
                            this._listCasino.push(dataResult[i]['RoomID']);
                        }
                        if (!gameType) {
                            this._listGameType.push(dataResult[i]['GameTpCode']);
                        }
                        tb = new TableInfo(dataResult[i]['RoomID'], dataResult[i]['GameTpCode'], dataResult[i]['TbID'], dataResult[i]['TbName'], dataResult[i]['IsEnabled']);
                        this._listTable.push(tb);
                    }
                }
                break;
            case Command.PERSON_INFO:
                this.userInfo = new UserInfo(this.loginName, data.Credit, data.CommRate, data.BonusCredit);
                break;
            case Command.BET_RESULT:
                let res = new ResultInfo(data);
                data = res;
                break;
            case Command.BET_START:
                if(isLobby){
                    command = Command.START_BET_LOBBY;
                }
                break;
            case Command.BET_STOP:
                if(isLobby){
                    command = Command.STOP_BET_LOBBY;
                }
                break;
        }
        this.update(command, data);
    }
}

export let model = new Model();