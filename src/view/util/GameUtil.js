/**
 * Created by carter on 10/13/2017.
 */
import {T} from '../../model/language/Translator'
export default class GameUtil {
    static sortArrayNumber(arr, type = 1) {
        arr.sort(function (a, b) {
            if (a > b) {
                return type * 1;
            } else if (a < b) {
                return type * -1;
            } else {
                return 0;
            }
        });
    }

    static getNamebyKey(key){
        let str = '';
        switch (key){
            case 'B':
                str = T.translate('LoBig').toUpperCase();
                break;
            case 'S':
                str = T.translate('LoSm').toUpperCase();
                break;
            case 'OD':
                str = T.translate('LoOdd').toUpperCase();
                break;
            case 'EV':
                str = T.translate('LoEven').toUpperCase();
                break;
        }
        return str;
    }

    static getChipText(value) {
        let arr = ["", "K", "M", "B"];
        let idx=0;
        while (value >= 1000) {
            value = value / 1000;
            idx++;
        }
        return value + arr[idx];
    }

    static formatCurrency(num, decimalPlace = 2, currency = "$")
    {
        //assigns true boolean value to neg in number less than 0
        let neg = (num < 0);

        //make the number positive for easy conversion
        num = Math.abs(num);
        //not round
        let str = num.toString();
        let tem = str.split(".");
        if (tem.length > 1)
        {
            str = tem[1];
            str = str.substr(0, 2);
            num = Number(tem[0] + "." + str);
        }
        //end
        let roundedAmount = String(num.toFixed(decimalPlace)); //do round

        //split string into array for dollars and cents
        let amountArray = roundedAmount.split(".");
        let dollars = amountArray[0];
        let cents = amountArray[1];
        //create dollar amount
        let dollarFinal = "";
        let i = 0;
        for (i; i < dollars.length; i++)
        {
            if (i > 0 && (i % 3 == 0))
            {
                dollarFinal = "," + dollarFinal;
            }

            dollarFinal = dollars.substr(-i - 1, 1) + dollarFinal;
        }

        //create Cents amount and zeros if necessary
        let centsFinal = String(cents);

        let missingZeros = decimalPlace - centsFinal.length;

        if (centsFinal.length < decimalPlace)
        {
            for (let j = 0; j < missingZeros; j++)
            {
                centsFinal += "0";
            }
        }

        let finalString = "";

        if (neg)
        {
            finalString = "-" + currency + dollarFinal;
        }
        else
        {
            finalString = currency + dollarFinal;
        }

        if (decimalPlace > 0)
        {
            finalString += "." + centsFinal;
        }
        return finalString;
    }
}
