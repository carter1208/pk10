export default class TableHistoryInfo {
    constructor() {
    }

    get history() {
        return this._history;
    }
    set history(value) {
        this._history = value;
    }
    get historyNum() {
        return this._historyNum;
    }
    set historyNum(value) {
        this._historyNum = value;
    }
}
