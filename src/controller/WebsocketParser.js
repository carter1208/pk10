/**
 * Created by loc on 6/9/2017.
 */
import Command from '../constant/Command';
import ConstData from '../constant/ConstData';
import {model} from "../model/Model";
import GameType from "../constant/GameType";

const DATA_SUCCESS = '0';

export default class WebsocketParser {
    constructor() {
    }
    createResult(objData) {
        let data = {};
        data.error = objData.error;
        if (objData.error == DATA_SUCCESS) {
            data.errorMessage = "";
        } else {
            data.errorMessage = objData.errorMessage;
        }
        return data;
    }

    updateTableList(result){
        let arr = [];
        let objJs = JSON.parse(result);
        let data = this.createResult(objJs);
        if (objJs.error == DATA_SUCCESS) {
            let objRes = objJs.result;
            for (let i = 0; i < objRes.length; i++ ){
                let obj =  objRes[i];
                arr.push({RoomID:obj.RoomID, RoomName:obj.RoomName, GameTpCode:obj.GameTpID, TbID:obj.TbID, TbName:obj.TbName, IsEnabled:obj.IsEnabled});
            }
        }
        data.result = arr;
        return arr;
    }

    parseResponse(command, result) {
        let strData = JSON.stringify(result.data);
        let data = {};
        let obj = null;
        let objJs;
        let arr = [];
        let temp;
        switch (command) {
            case Command.SESSION:
                objJs = JSON.parse(strData);
                data = this.createResult(objJs);
                if (data.error == DATA_SUCCESS) {
                    obj = {};
                    let objRes = objJs.result;
                    obj.sessionId = objRes.SessionToken;
                    obj.oIsUseBonusBal = objRes.IsUseBonusBal;
                    model.loginPass = objRes.GamePwd;
                    model.apiToken = "";
                }
                break;
            case Command.PERSON_INFO:
                objJs = JSON.parse(strData);
                data = this.createResult(objJs);
                if (data.error == DATA_SUCCESS) {
                    obj = {};
                    let objRes = objJs.result;
                    obj.Credit = objRes.AvailCredit;
                    obj.CommRate = objRes.CommRate;
                    obj.BonusCredit = objRes.BonusCredit;
                }
                break;
            case Command.GAME_LIMIT:
                objJs = JSON.parse(strData);
                data = this.createResult(objJs);
                if (data.error == DATA_SUCCESS) {
                    obj = {};
                    let objRes = objJs.result;
                    obj.minBet = objRes.MinBet;
                    obj.maxBet = objRes.MaxBet;
                }
                break;
            case Command.TABLE_LIST_BY_USER:
                obj = [];
                objJs = JSON.parse(strData);
                data = this.createResult(objJs);
                if (data.error == DATA_SUCCESS) {
                    let objRes = objJs.result;
                    for (let i = 0; i < objRes.length; i++ ){
                        let obj1 =  objRes[i];
                        obj.push({RoomID:obj1.RoomID, RoomName:obj1.RoomName, GameTpCode:obj1.GameTpID, TbID:obj1.TbID, TbName:obj1.TbName, IsEnabled:obj1.IsEnabled});
                    }
                }
                break;

            case Command.BET_RESULT:
                objJs = JSON.parse(strData);
                data = this.createResult(objJs);
                if (data.error == DATA_SUCCESS) {
                    obj = {};
                    let objRes = objJs.result;
                    obj.tableId = objRes.TbID;
                    obj.drawNoRef = objRes.DrawNoRef;
                    obj.num = objRes.Nums;
                }
                break;

            case Command.BET_START:
                objJs = JSON.parse(strData);
                data = this.createResult(objJs);
                if (objJs.error == DATA_SUCCESS) {
                    obj = {};
                    let objRes = objJs.result;
                    obj = new Object();
                    obj.countDown = result.countdown;
                    obj.tbId = objRes.TbID;
                    obj.drawNo = objRes.DrawNoRef;
                    obj.gameSet =  objRes.GameSet;
                    obj.gameNo =  objRes.GameNo;
                }
                break;

            case Command.BET_STOP:
                objJs = JSON.parse(strData);
                data = this.createResult(objJs);
                let objRes = objJs.result;
                obj = new Object();
                obj.tbId = result.tableId;
                obj.drawNo = result.drawno;
                break;
            case Command.REPORT_BETTING:
                objJs = JSON.parse(strData);
                data = this.createResult(objJs);
                let records = [];
                if (objJs.error == DATA_SUCCESS) {
                    let objRes = objJs.result;
                    if(objRes.result){
                        obj = {};


                        for (let i = 0; i < objRes.result.length; i++ ){
                            let rec = {};
                            let item = objRes.result[i];
                            rec.date = item.TrDate;
                            rec.ticketNo = item.TrID;
                            rec.TbID = item.TbID;
                            rec.betDetail = item.BetDetails;
                            rec.stake = item.BetAmt;
                            rec.winloss = item.WinAmt;
                            rec.result = item.WLStatus;
                            rec.game = item.TbName;
                            rec.drawNo = item.DrawNo;

                            records.push(rec);
                        }
                        obj.page = parseInt(objRes.PageNo);
                        obj.totalRow = parseInt(objRes.TotalRow);
                        obj.records = records;
                    }
                }
                break;
            case Command.REPORT_RESULT:
                objJs = JSON.parse(strData);
                data = this.createResult(objJs);
                records = [];
                if (objJs.error == DATA_SUCCESS) {
                    let objRes = objJs.result;
                    if(objRes.result){
                        obj = {};
                        for (let i = 0; i < objRes.result.length; i++ ){
                            let item = objRes.result[i];
                            let rec = {};
                            rec.drawNoRef = item.DrawNoRef;
                            rec.date = item.StartDate;
                            rec.num = item.Nums;
                            rec.tableName = item.TbName;

                            records.push(rec);
                        }
                        obj.page = parseInt(objRes.PageNo);
                        obj.totalRow = parseInt(objRes.TotalRow);
                        obj.records = records;
                    }
                }
                break;
            case  Command.TABLE_INFO:
                objJs = JSON.parse(strData);
                data = this.createResult(objJs);
                if (data.error == DATA_SUCCESS) {
                    let item = objJs.result;
                    obj = {};
                    obj.tableName = item.TbName;
                    obj.drawNoRef = item.DrawNoRef;
                    obj.status = item.TbStatus;
                    obj.gameSet = item.GameSet;
                    obj.gameNo = item.GameNo;
                }
                break;
            case  Command.TABLE_HISTORY:
                objJs = JSON.parse(strData);
                data = this.createResult(objJs);
                if (data.error == DATA_SUCCESS) {
                    if (!objJs.result){
                        return;
                    }
                    obj = [];
                    let arr = objJs.result;
                    for (let i = 0; i < arr.length; i++)
                    {
                        let his = {};
                        let item = arr[i];
                        his.tableId = this.tableId;
                        his.drawNoRef = item.DrawNoRef;
                        his.num = item.Nums;
                        obj.push(his);
                    }
                }
                break;
            case  Command.GET_ODD_LIVE:
                objJs = JSON.parse(strData);
                data = this.createResult(objJs);
                if (data.error == DATA_SUCCESS) {
                    if (!objJs.result){
                        return;
                    }
                    let item = objJs.result;
                    let arr = item.ListOdds;
                    model.setBetStatus(item.IsStartBet);
                    obj = [];
                    for (let i = 0; i < arr.length; i++)
                    {
                        let objBet = new Object();
                        let obj1 = arr[i];
                        objBet.key = obj1.BetCode;
                        objBet.odd = obj1.Odds;
                        objBet.isOnline = obj1.IsOnline;
                        obj.push(objBet);
                    }
                }
                break;
            case  Command.GET_ODD_DEFAULT:
                objJs = JSON.parse(strData);
                data = this.createResult(objJs);
                if (data.error == DATA_SUCCESS) {
                    if (!objJs.result){
                        return;
                    }
                    let item = objJs.result;
                    let arr = item.ListOdds;
                    obj = [];
                    for (let i = 0; i < arr.length; i++)
                    {
                        let objBet = new Object();
                        let obj1 = arr[i];
                        objBet.key = obj1.BetCode;
                        objBet.odd = obj1.Odds;
                        objBet.isOnline = obj1.IsOnline;
                        obj.push(objBet);
                    }
                }
                break;
            case Command.TABLE_START:
                objJs = JSON.parse(strData);
                data = this.createResult(objJs);
                if (data.error == DATA_SUCCESS) {
                    obj = {};
                    let objRes = objJs.result;
                    obj.countDown = result.countdown;
                    obj.tbId = objRes.TbID;
                    obj.drawNo = objRes.DrawNoRef;
                    obj.gameSet = objRes.GameSet;
                    obj.gameNo = objRes.GameNo;
                }
                break;
            case Command.SERVER_DATE:
                objJs = JSON.parse(strData);
                data = this.createResult(objJs);
                obj = '';
                if (data.error == DATA_SUCCESS) {
                    let objRes = objJs.result;
                    obj = objRes.DateTime;
                }
                break;
            case Command.LAST_DRAW_RESULT:
                objJs = JSON.parse(strData);
                data = this.createResult(objJs);
                if (data.error == DATA_SUCCESS) {
                    let item = objJs.result;
                    let objRes = item.listResult[0];
                    obj = {};
                    obj.num = objRes.Nums;
                    obj.tableId = item.TbID;
                    obj.drawNoRef = objRes.DrawNoRef;
                }
                break;
            case Command.UPDATE_BETTING:
                objJs = JSON.parse(strData);
                data = this.createResult(objJs);
                if (data.error == DATA_SUCCESS) {
                    obj = [];
                    let objRes = objJs.result;
                    let arr = objRes.ListBetDetail;
                    for (let i = 0; i < arr.length; i++)
                    {
                        var objBet = {};
                        var item = arr[i];
                        objBet.betCode = item.BetCode;
                        objBet.totalBet = item.BetAmt;
                        objBet.betAmt = item.AccBetAmt;
                        objBet.odd = item.Odds;
                        objBet.status = item.Status;
                        obj.push(objBet);
                    }
                }
                break;
        }
        data.result = obj;
        return data;
    }
}
