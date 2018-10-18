export default class TableHistoryInfo {
    constructor() {
    }

    get getHistory() {
        return this._history;
    }
    set setHistory(value) {
        value.reverse();
        this._history = value;
    }
    get historyNum() {
        return this._historyNum;
    }
    set historyNum(value) {
        this._historyNum = value;
    }
}
