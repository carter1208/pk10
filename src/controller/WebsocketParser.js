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
                        let item = {};
                        let rec = {};

                        for (let i = 0; i < objRes.result.length; i++ ){
                            item = objRes.result[i];
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
        }
        data.result = obj;
        return data;
    }

    parseBetting(result) {
        let arrCode;
        let arrValue;
        let pos = 0;
        let len = 9;
        let arrRes = [];
        let i;
        switch (model.gameType) {
            case GameType.BACCARAT:
                arrCode = ["BaBank", "BaDeal", "BaTie", "BaBPa", "BaPPa", "BaBig", "BaSm"];
                arrValue = [0, 0, 0, 0, 0, 0, 0];
                break;
            case GameType.BACCARAT_INSURANCE:
                arrCode = ["BiBank", "BiDeal", "BiTie", "BiBPa", "BiPPa", "BiBig", "BiSm", "BI", "PI"];
                arrValue = [0, 0, 0, 0, 0, 0, 0, 0, 0];
                break;
            case GameType.DRAGON_TIGER:
                arrCode = ["DtDWin", "DtTWin", "DtTie"];
                arrValue = [0, 0, 0];
                break;
            case GameType.SICBO:
                arrCode = [];
                arrValue = [];
                for (i = 1; i < 51; i++ ) {
                    arrCode.push("Dc" + i.toString());
                    arrValue.push(0);
                }
                break;
        }

        if (arrCode) {
            for (i = 0; i < arrCode.length; i++) {
                arrValue[i] = parseInt(result.substr(pos, len));
                pos += len;
                if (arrValue[i] > 0) {
                    arrRes.push({BetCode:arrCode[i], BetAmt:arrValue[i]});
                }
            }
        } else if (model.gameType == GameType.ROULETTE) {
            let posCode = 0;
            let lenCode = 4;
            let posValue = 4;
            let lenValue = 9;
            let bcode;
            let bvalue;
            while (posValue < result.length) {
                bcode = result.substr(posCode, lenCode);
                bvalue = parseFloat(result.substr(posValue, lenValue))
                if (bvalue > 0) {
                    arrRes.push({BetCode:bcode, BetAmt:bvalue});
                }

                posCode += lenCode + lenValue;
                posValue += lenCode + lenValue;
            }
        }

        return arrRes;
    }

}
