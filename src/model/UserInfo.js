/**
 * Created by carter on 7/26/2017.
 */
export default class UserInfo
{
    constructor(name, balance, rate, bonus)
    {
        this.name = name;
        this.balance = parseFloat(balance);
        this.commissionRate = rate;
        this.bonus = parseFloat(bonus);
    }
}
