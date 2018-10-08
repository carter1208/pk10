/**
 * Created by carter on 7/4/2017.
 */
import TableHistoryInfo from './history/TableHistoryInfo'

import GameType from "../constant/GameType"
export default class TableInfo {
    constructor(casinoId, gameType, tableId, tableName, tableStatus) {
        this.casinoId = casinoId;
        this.gameType = gameType;
        this.id = tableId;
        this.name = tableName;
        this.isOpen = (tableStatus == "0") ? false : true;
        switch (casinoId) {
            case "38":
                this.priority = 38;
                break;
        }
        switch (gameType) {
            case GameType.LOTTERY:
                this.history = new TableHistoryInfo();
                break;
        }
    }

    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }

    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }

    get casinoId() {
        return this._casinoId;
    }
    set casinoId(value) {
        this._casinoId = value;
    }

    get casinoName() {
        return this._casinoName;
    }
    set casinoName(value) {
        this._casinoName = value;
    }

    get gameType() {
        return this._gameType;
    }
    set gameType(value) {
        this._gameType = value;
    }

    get gameName() {
        return this._gameName;
    }
    set gameName(value) {
        this._gameName = value;
    }

    get isOpen() {
        return this._isOpen;
    }
    set isOpen(value) {
        this._isOpen = value;
    }

    get priority() {
        return this._priority;
    }
    set priority(value) {
        this._priority = value;
    }

    get history() {
        return this._history;
    }
    set history(value) {
        this._history = value;
    }
    get gameSet() {
        return this._gameSet;
    }
    set gameSet(value) {
        this._gameSet = value;
    }
    get gameNo() {
        return this._gameNo;
    }
    set gameNo(value) {
        this._gameNo = value;
    }

}
