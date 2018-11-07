/**
 * Created by carter on 9/27/2018.
 */
import Subject from '../observer/Subject';
import Command from '../constant/Command';
import UserInfo from './UserInfo';
import TableInfo from './TableInfo';
import ResultInfo from './ResultInfo';
import BetPlaceInfo from '../model/LoBetPlaceInfo'
import RangeItemInfo from './RangeItemInfo'
import LotteryBetType from '../enum/LotteryBetType'
import LotteryResult from '../enum/LotteryResult'

class Model extends Subject {
    get subMenu() {
        return this._subMenu;
    }

    set subMenu(value) {
        this._subMenu = value;
    }
    get arrChipValue() {
        return this._arrChipValue;
    }

    set arrChipValue(value) {
        this._arrChipValue = value;
    }
    get listCasino() {
        return this._listCasino;
    }
    get listGameType(){
        return this._listGameType;
    }
    get listTable(){
        return this._listTable;
    }
    get listBetPlaceInfo(){
        return this._listBetPlaceInfo;
    }
    get range(){
        return this._range;
    }
    constructor() {
        super();
        this.isBetting = false;
        this.gameMode = 's';
        this.gameType = "Pk10";
        this.language = "E";
        this.tableId = "0";
        this.apiToken = "";
        this.loginName = "";
        this.loginPass = "";
        this.casinoVisible = "";
        this._listCasino = [];
        this._listBetPlaceInfo = [];
        this._listGameType = [];
        this._range = null;
        this._subMenu = '';
        //test
        this._objOpen = {};
        this._arrChipValue = [];
        this.objCombine2 ={};
        this.objCombine3 ={};
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

    setBetStatus(data){
        this.isBetting = false;
        this.update(Command.UPDATE_STOP_BETTING);
    }

    initBetCode(){
        this._listBetPlaceInfo = [];
        this.createPositionBetCode();
        this.createDTBetCode();
        this.createSum2BetCode();
        this.createSum3BetCode();
        this.createCombine2BetCode();
        this.createCombine3BetCode();
    }
    createPositionBetCode(){
        let betcode = '';
        let betInfo;
        let arr = ['B', 'S', 'EV', 'OD'];
        for (let i = 1; i < 11; i++)
        {
            for (let j = 1; j < 11; j++)
            {
                if (i == 10 && j == 10)
                    betcode = 'Lo' + i + "" + j;
                else
                    betcode = 'Lo' + i + "-" + j;
                betInfo = new BetPlaceInfo(betcode, this._range.maxValue, this._range.minValue, 9.5, LotteryBetType.POSITION);
                betInfo.groupName = 'position';
                this._listBetPlaceInfo.push(betInfo);
            }
            betcode = '';
            for (let k = 0; k < arr.length; k++)
            {
                betcode = 'Lo' + i + arr[k];
                betInfo = new BetPlaceInfo(betcode, this._range.maxValue, this._range.minValue, 9.5, LotteryBetType.POSITION);
                betInfo.groupName = 'position';
                this._listBetPlaceInfo.push(betInfo);
            }
        }
    }
    createDTBetCode(){
        let betcode = '';
        let betInfo;
        for (let i = 1; i < 11; i++)
        {
            if (i < 6)
                betcode = 'LoD' + i;
            else
                betcode = 'LoG' + i;
            betInfo = new BetPlaceInfo(betcode, this._range.maxValue, this._range.minValue, 9.5, LotteryBetType.DRAGON_TIGER);
            betInfo.groupName = 'dt';
            this._listBetPlaceInfo.push(betInfo);
        }
    }
    createSum2BetCode(){
        let betInfo;
        let betcode = '';
        let arr = ['B', 'S', 'EV', 'OD'];
        let arr1 = [3, 4, 7, 8, 11, 12, 15, 16, 19];
        for (let i = 0; i < arr1.length; i++)
        {
            betcode = 'Lo2S' + arr1[i];
            betInfo = new BetPlaceInfo(betcode, this._range.maxValue, this._range.minValue, 19.5, LotteryBetType.SUM_OF_2);
            betInfo.groupName = 'sum2';
            this._listBetPlaceInfo.push(betInfo);
        }
        for (let i = 0; i < arr.length; i++)
        {
            betcode = 'Lo2S' + arr[i];
            betInfo = new BetPlaceInfo(betcode, this._range.maxValue, this._range.minValue, 9.5, LotteryBetType.SUM_OF_2);
            betInfo.groupName = 'sum2';
            this._listBetPlaceInfo.push(betInfo);
        }
    }
    createSum3BetCode(){
        let betInfo;
        let betcode = '';
        let arr = ['B', 'S', 'EV', 'OD'];
        let arr1 = [6, 7, 10, 11, 14, 15, 18, 19, 22, 23, 26, 27];
        for (let i = 0; i < arr1.length; i++)
        {
            betcode = 'Lo3S' + arr1[i];
            betInfo = new BetPlaceInfo(betcode, this._range.maxValue, this._range.minValue, 9.5, LotteryBetType.SUM_OF_3);
            betInfo.groupName = 'sum3';
            this._listBetPlaceInfo.push(betInfo);
        }
        for (let i = 0; i < arr.length; i++)
        {
            betcode = 'Lo3S' + arr[i];
            betInfo = new BetPlaceInfo(betcode, this._range.maxValue, this._range.minValue, 9.5, LotteryBetType.SUM_OF_3);
            betInfo.groupName = 'sum3';
            this._listBetPlaceInfo.push(betInfo);
        }
    }
    createCombine2BetCode(){
        let betcode = '';
        for (let i = 1; i < 11; i++)
        {
            for (let j = 1; j < 11; j++)
            {
                if (i == j)
                    continue;
                betcode = 'Lo' + i + j;
                let betInfo = new BetPlaceInfo(betcode, this._range.maxValue, this._range.minValue, 44, LotteryBetType.COMBINE_2);
                betInfo.groupName = 'combine';
                this._listBetPlaceInfo.push(betInfo);
            }
        }
    }
    createCombine3BetCode(){
        let betcode = '';
        for (let i = 1; i < 11; i++)
        {
            for (let j = 1; j < 11; j++)
            {
                if (j == i)
                    continue;
                for (let k = 1; k < 11; k++)
                {
                    if (j == k || k == i)
                        continue;
                    betcode = 'Lo' + i + j + k;
                    let betInfo = new BetPlaceInfo(betcode, this._range.maxValue, this._range.minValue, 110, LotteryBetType.COMBINE_3);
                    betInfo.groupName = 'combine';
                    this._listBetPlaceInfo.push(betInfo);
                }
            }
        }
    }

    getHistoryByDrawNo(drawNo)
    {
        let arr = this.table.history.getHistory;
        let item = arr.filter((item)=>{
            if(item.drawNoRef == drawNo){
                return item.num;
            }
        });
        if (item) {
            return item[0].num;
        } else {
            return null;
        }
    }

    getBetPlaceInfo(name)
    {
        for(let i=0;i < this.listBetPlaceInfo.length -1; i++)
        {
            if (this.listBetPlaceInfo[i].betCode == name)
            {
                return this.listBetPlaceInfo[i];
                break;
            }
        }
        return null;
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
                    let isOpenTb = dataResult[i]['IsEnabled'] == LotteryResult.TRUE;
                    if (this.checkVisibleCasino(dataResult[i]['RoomID']) && isOpenTb) {
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
            case Command.TABLE_HISTORY:
                this.table.history.setHistory = data;
                break;
            case Command.TABLE_INFO:
                this.table = new TableInfo("", "Lo", this.tableId, data.tableName, data.status);
                this.table.drawNo = data.drawNoRef;
                this.table.gameSet = data.gameSet;
                this.table.gameNo = data.gameNo;
                break;
            case Command.GAME_LIMIT:
                let minBet = parseFloat(data.minBet);
                let maxBet = parseFloat(data.maxBet);
                this._range = new RangeItemInfo("0", minBet, maxBet);
                break;
            case Command.BET_RESULT:
                let res = new ResultInfo(data);
                data = res;
                break;
            case Command.BET_START:
                if(isLobby){
                    command = Command.START_BET_LOBBY;
                }else {
                    this.update(Command.REPORT_RECENT_BET, Command.BET_START)
                }
                break;
            case Command.BET_STOP:
                if(isLobby){
                    command = Command.STOP_BET_LOBBY;
                }
                break;
            case Command.GET_ODD_LIVE:
                for (var i = 0; i < data.length; i++)
                {
                    if (data[i].key == "LoCo2F")
                    {
                        this.objCombine2.oddValue = data[i].odd;
                        this.objCombine2.isOnline = data[i].isOnline;
                    }
                    else if(data[i].key == "LoCo3F")
                    {
                        this.objCombine3.oddValue = data[i].odd;
                        this.objCombine3.isOnline = data[i].isOnline;
                    }
                    else
                    {
                        var betInfo = this.getBetPlaceInfo(data[i].key);
                        if (!betInfo)continue;
                        betInfo.oddValue = parseFloat(''+data[i].odd);
                        betInfo.isOnline = data[i].isOnline == LotteryResult.TRUE;
                    }
                }
                break;
            case Command.LAST_DRAW_RESULT:
                res = new ResultInfo(data);
                data = res;
                break;
        }
        this.update(command, data);
    }
}

export let model = new Model();