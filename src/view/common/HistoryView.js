/**
 * Created by carter on 10/30/2018.
 */
import * as PIXI from 'pixi.js';
import DisplayUtil from '../util/DisplayUtil'
import HistoryIcon from './HistoryIcon'
import LotteryResult from '../../enum/LotteryResult'

const IDX_DT	 = '11';
const IDX_SUM2	 = '12';
const IDX_SUM3	 = '13';
export default class HistoryView extends PIXI.Container{
    constructor(props) {
        super();
    }

    init(w, h, col, row, isDraw = false){
        this.mcHistory = new PIXI.Container();
        this.tbGraphic = new PIXI.Graphics();
        this.tbWidth = w;
        this.tbHeight = h;
        this.tbCol = col;
        this.tbRow = row;
        this.colorFill = 0xFFFFFF;
        this.colorStroke = 0x949494;
        if (isDraw)
        {
            this.drawTable();
        }
        this.addChild(this.tbGraphic);
        this.addChild(this.mcHistory);
    }

    drawTable() {
        var i;
        var cw = this.tbWidth / this.tbCol;
        var ch = this.tbHeight / this.tbRow;
        this.tbGraphic.beginFill( this.colorFill);
        this.tbGraphic.lineStyle(1,  this.colorStroke);
        this.tbGraphic.drawRect(1, 0,  this.tbWidth,  this.tbHeight);

        for (i = 1; i < this.tbRow; i++) {
            this.tbGraphic.moveTo(1, i * ch);
            this.tbGraphic.lineStyle(1, this.colorStroke, 1);
            this.tbGraphic.lineTo(this.tbWidth, i * ch);
        }
        for (i = 1; i < this.tbCol; i++) {
            this.tbGraphic.moveTo(i * cw, 1);
            this.tbGraphic.lineStyle(1, this.colorStroke, 1);
            this.tbGraphic.lineTo(i * cw, this.tbHeight);
        }
        this.tbGraphic.endFill();
    }

    setData(arrHis, key, type) {
        if (!arrHis || arrHis.length == 0) {
            return;
        }
        this.displaySequence(arrHis, key, type);
    }

    attachIconPosition(arr, key, range, limit) {
        var tie = "/";
        var mcHisIcon = new HistoryIcon();
        var value = 0;
        switch (range)
        {
            case 12:
                value = parseInt(arr[0]) + parseInt(arr[1]);
                break;
            case 13:
                value = parseInt(arr[0]) + parseInt(arr[1]) + parseInt(arr[2]);
                break;
            default:
                value = parseInt(arr[range - 1]);
        }
        switch (key) {
            case 'bigSmall':
                if (value > limit) {
                    mcHisIcon.setColor(LotteryResult.COLOR_RED);
                    this.keyWord = "LoBig_short";
                }else if (value < limit) {
                    mcHisIcon.setColor(LotteryResult.COLOR_BLUE);
                    this.keyWord = "LoSm_short";
                }else {
                    mcHisIcon.setColor(LotteryResult.COLOR_GREEN);
                    this.keyWord = tie;
                }
                break;
            case 'oddEven':
                if (value % 2 != 0) {
                    mcHisIcon.setColor(LotteryResult.COLOR_RED);
                    this.keyWord = "LoOdd_short";
                }else{
                    mcHisIcon.setColor(LotteryResult.COLOR_BLUE);
                    this.keyWord = "LoEven_short";
                }
                break;
            case 'sumPoint':
                var num = value;
                this.keyWord = value.toString();
                if (num < 811) {
                    mcHisIcon.setColor(LotteryResult.COLOR_BLUE);
                }else {
                    mcHisIcon.setColor(LotteryResult.COLOR_RED);
                }

                break;
        }
        return mcHisIcon;
    }

    attachIconDT(arr, key) {
        var tie = "/";
        var mcHisIcon = new HistoryIcon();
        var val1 = "";
        var val2 = "";

        switch (key) {
            case "1V10":
                val1 = "1";
                val2 = "10";
                break;
            case "2V9":
                val1 = "2";
                val2 = "9";
                break;
            case "3V8":
                val1 = "3";
                val2 = "8";
                break;
            case "4V7":
                val1 = "4";
                val2 = "7";
                break;
            case "5V6":
                val1 = "5";
                val2 = "6";
                break;
        }
        if (arr.indexOf(parseInt(val1)) > arr.indexOf(parseInt(val2))) {
            mcHisIcon.setColor(LotteryResult.COLOR_RED);
            this.keyWord = "LoT_short";
        }else{
            mcHisIcon.setColor(LotteryResult.COLOR_BLUE);
            this.keyWord = "LoD_short";
        }
        return mcHisIcon;
    }

    calcLenLineDisplay(arrHis, key, typeHis) {
        var range = 0;
        var limit = 0;

        switch (typeHis)
        {
            case IDX_SUM2:
                limit = 11;
                break;
            case IDX_SUM3:
                limit = 16.5;
                break;
            default:
                limit = 5;
        }
        range = parseInt(typeHis);

        var row = 0;
        var col = 0;
        var preValue = "";
        var currValue = "";
        var colNext = 1;
        var endRow = this.tbRow;
        var tailEnd = [];
        var index = Math.max(0, arrHis.length - this.tbRow*this.tbCol);
        while (index < arrHis.length) {
            row = col = 0;
            preValue = currValue = "";
            colNext = 1;
            endRow = this.tbRow;
            tailEnd = [];

            while (tailEnd.length < this.tbRow + 1) { //array starts at 1
                tailEnd.push(0);
            }

            for (var i = index; i < arrHis.length; i++ ) {
                var iconHis;
                if (typeHis == IDX_DT)
                    iconHis = this.attachIconDT(arrHis[i].num, key);
                else
                    iconHis = this.attachIconPosition(arrHis[i].num, key, range, limit);
                currValue = this.keyWord;
                //if the first one
                if (row == 0) {
                    row = 1;
                    col = colNext;
                } else if (this.checkIsTie(currValue, key) || (currValue == preValue)) {
                    row++;
                    if (row > endRow) {
                        row--;
                        tailEnd[row] = ++col;
                    } else if (col <= tailEnd[row]) {
                        row--;
                        tailEnd[row] = ++col;
                        endRow = row;
                    }
                    if (col > this.tbCol-1) {
                        index += 2;
                        break;
                    }
                } else {
                    colNext++;
                    endRow = this.tbRow;
                    row = 1;
                    col = colNext;
                    if (col > this.tbCol-1) {
                        index += 2;
                        break;
                    }
                }

                if (!this.checkIsTie(currValue, key)){
                    preValue = currValue;
                }
            }

            if (i >= arrHis.length) {
                break;
            }
        }
        return index;
    }

    displaySequence(arrHis, key, typeHis) {
        this.removeHistory(this.mcHistory);
        var i = this.calcLenLineDisplay(arrHis, key, typeHis);
        var cw = this.tbWidth / this.tbCol;
        var ch = this.tbHeight / this.tbRow;
        var px = -cw/2;
        var py = -ch/2;
        var row = 0;
        var col = 0;
        var range = 0;
        var limit = 0;

        var preValue = "";
        var currValue = "";
        var colNext = 1;
        var endRow = this.tbRow;

        var tailOfRow = [];
        while (tailOfRow.length < this.tbRow + 1) { //array starts at 1
            tailOfRow.push(0);
        }

        switch (typeHis)
        {
            case IDX_SUM2:
                limit = 11;
                break;
            case IDX_SUM3:
                limit = 16.5;
                break;
            default:
                limit = 5;
        }
        range = parseInt(typeHis);
        for (i; i < arrHis.length; i++)	{
            var iconHis;
            if (typeHis == IDX_DT)
                iconHis = this.attachIconDT(arrHis[i].num, key);
            else
                iconHis = this.attachIconPosition(arrHis[i].num, key, range, limit);
            currValue = this.keyWord;
            iconHis.setText(this.keyWord);
            if (iconHis == null) {
                continue;
            }
            if (row == 0) {
                row = 1;
                col = colNext;
            } else if (this.checkIsTie(currValue, key) || (currValue == preValue)) {
                row++;
                if (row > endRow) {
                    row--;
                    tailOfRow[row] = ++col;
                } else if (col <= tailOfRow[row]) {
                    row--;
                    tailOfRow[row] = ++col;
                    endRow = row;
                }
            } else {
                colNext++;
                endRow = this.tbRow;
                row = 1;
                col = colNext;
            }

            if (!this.checkIsTie(currValue, key)){
                preValue = currValue;
            }
            iconHis.x = px + col * cw;
            iconHis.y = py + row * ch;
            this.mcHistory.addChild(iconHis);
        }
    }

    checkIsTie(value, key) {
        if (value == "/"){
            return true;
        }
        return false;
    }

    removeHistory(obj)
    {
        while (obj.children.length > 0) {
            obj.removeChild(obj.children[0]);
        }
    }
}
