export default class RangeItemInfo {
    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get min() {
        return this._min;
    }

    set min(value) {
        this._min = value;
    }

    get max() {
        return this._max;
    }

    set max(value) {
        this._max = value;
    }
    constructor(id, min, max) {
        this._id = id;
        this._min = min;
        this._max = max;
    }
}
