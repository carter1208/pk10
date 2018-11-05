export default class LoBetPlaceInfo
{
	constructor(betCode, maxRange, minRange, oddValue = 1, type = '')
	{
		this.maxRange = maxRange;
		this.minRange = minRange;
		this.betCode = betCode;

		//set oddvalue MUST after set maxrange and minrange
		this.oddValue = 0;
		this.isOnline = true;

		this.lastValue = 0;
		this.confirmedValue = 0;
		this.currentValue = 0;
		this.tempValue = 0;
		this.type = type;
	}

	reset() {
		this.confirmedValue = 0;
		this.currentValue = 0;
		this.tempValue = 0;
	}

	//////////////////////////////////////////////////////////////
	//					SELECTOR								//
	//////////////////////////////////////////////////////////////
	get oddValue()
	{
		return this._oddValue;
	}

	set oddValue(value)
	{
		this._oddValue = value;
		this._oddValueOrg = value;
		if (this._oddValue < 1) {
			this._oddValue = 1;
		}
		this._maxBet = this.maxRange;
		this._minBet = this.minRange;
	}

	get maxBet()
	{
		return this._maxBet;
	}

	get minBet()
	{
		return this._minBet;
	}

	get betCode()
	{
		return this._betCode;
	}

	set betCode(value)
	{
		this._betCode = value;
	}

	get lastValue()
	{
		return this._lastValue;
	}

	set lastValue(value)
	{
		this._lastValue = value;
	}

	get tempValue()
	{
		return this._tempValue;
	}

	set tempValue(value)
	{
		if(!this.isOnline) return;
		this._tempValue = value;
	}

	get confirmedValue()
	{
		return this._confirmedValue;
	}

	set confirmedValue(value)
	{
        if(!this.isOnline) return;
		this._confirmedValue = value;
	}

	get currentValue()
	{
		return this._currentValue;
	}

	set currentValue(value)
	{
        if(!this.isOnline) return;
		this._currentValue = value;
	}

	get oddValueOrg()
	{
		return this._oddValueOrg;
	}

	set oddValueOrg(value)
	{
		this._oddValueOrg = value;
	}

    get isOnline()
    {
        return this._isOnline;
    }

    set isOnline(value)
    {
        this._isOnline = value;
    }

    get groupName()
    {
        return this._groupName;
    }

    set groupName(value)
    {
        this._groupName = value;
    }

    get type()
    {
        return this._type;
    }

    set type(value)
    {
        this._type = value;
    }

    get isChanged()
    {
        return this._isChanged;
    }

    set isChanged(value)
    {
        this._isChanged = value;
    }
}

