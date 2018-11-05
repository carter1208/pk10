/**
 * Created by carter on 10/22/2018.
 */
import React,{Component} from 'react';
import {model} from '../../model/Model'
import ChipSettingItem from "./ChipSettingItem";
import GameUtil from "../util/GameUtil";
import Command from "../../constant/Command";
import {T} from '../../model/language/Translator'
export default class ChipSettingPanel extends Component{
    constructor(props){
        super(props);
        this.state = {
            arrDefault:[],
            arrShow:[],
            arrSelect:[],
            arrNormal:[],
            arrTemp:[],
            isShow:false
        }
    }

    componentDidMount() {

    }

    init(){
        let arr = this.setRangeChip(model.range.min, model.range.max);
        GameUtil.sortArrayNumber(arr);
        this.setState({
            arrSelect: arr.concat(),
            arrDefault:arr.concat(),
            arrShow:arr.concat()
        });
    }

    setRangeChip(minValue, maxValue) {
        let arrDefault = [];
        var arrValue = model.arrChipValue;
        //get min value
        var idxMin;
        for (var i = 0; i < arrValue.length; i++ ) {
            if (arrValue[i] >= minValue) {
                break;
            }
        }
        idxMin = Math.min(i, arrValue.length - 1);
        arrDefault.push(arrValue[idxMin]);

        //get max value
        var idxMax;
        for (i = arrValue.length - 1; i > -1; i-- ) {
            if (arrValue[i] <= maxValue) {
                break;
            }
        }
        idxMax = Math.max(i, 0);
        if (idxMax > idxMin) {
            arrDefault.push(arrValue[idxMax]);
            //get some value between min-max
            var arrTemp = [];
            for (i = idxMin + 1; i < idxMax; i++ ) {
                arrTemp.push(arrValue[i]);
            }

            while (arrTemp.length > 0 && arrDefault.length < 6) {
                i = Math.floor(Math.random() * arrTemp.length);
                arrDefault.push(arrTemp.splice(i, 1)[0]);
            }
        }
        return arrDefault;
    }

    show(e){
        GameUtil.sortArrayNumber(this.state.arrDefault);
        let arr = this.state.arrDefault;
        this.setState({
            isShow:true,
            arrSelect:arr.concat(),
            arrNormal:arr.concat(),
            arrShow:arr.concat()
        });
    }

    clearBet(e){
        this.show(new Event('click'));
    }

    confirm(e){
        if (this.checkEmpty())
        {
            alert("the value must be larger than 0 or not empty.", "errMsg", "fail");
            return;
        }
        if (this.state.arrSelect.length > this.state.arrNormal.length)
        {
            if (this.checkExist(this.state.arrSelect[this.state.arrSelect.length-1]))
            {
                alert("the value is exist.", "errMsg", "fail");
                return;
            }
        }

        var arrNewVal = this.compareArray(this.state.arrSelect, this.state.arrNormal);
        for (var i = 0; i < arrNewVal.length; i++)
        {
            this.state.arrNormal.push(parseInt(arrNewVal[i]));
        }
        this.state.arrDefault = this.state.arrNormal.concat();
        this.state.arrSelect = this.state.arrNormal.concat();
        let arr = this.state.arrNormal.concat();
        this.setState({
            arrShow:arr
        });
        model.update(Command.UPDATE_CHIP_SETTING, this.state.arrDefault.concat());

        document.getElementById('text_save').style.visibility = 'visible';
        setTimeout("document.getElementById('text_save').style.visibility = 'hidden'", 2000);
    }

    compareArray(arrDefault, arrSelected){
        var arr = [];
        for(let i=0; i< arrDefault.length; i++){
            if (arrSelected.indexOf(arrDefault[i]) == -1){
                arr.push(arrDefault[i]);
            }
        }
        return arr;
    }

    close(e){
        this.setState({
            isShow:false
        });
    }

    hdlChange(val){
        this.state.arrSelect = this.state.arrTemp.concat();
        this.state.arrSelect.push(val);
    }

    hdlInsert(){
        if (this.checkEmpty())
        {
            alert("the value must be larger than 0 or not empty.", "errMsg", "fail");
            return;
        }
        if (this.state.arrSelect.length > this.state.arrNormal.length)
        {
            if (this.checkExist(this.state.arrSelect[this.state.arrSelect.length-1]))
            {
                alert("the value is exist.", "errMsg", "fail");
                return;
            }
        }
        this.state.arrTemp = this.state.arrSelect.concat();
        this.state.arrNormal = this.state.arrSelect.concat();
        this.state.arrSelect.push(0);
        let arr = this.state.arrSelect.concat();
        this.setState({
            arrShow:arr
        });
    }

    checkEmpty(){
        for(let i = 0; i < this.state.arrSelect.length; i++){
            if (this.state.arrSelect[i] < 1)
                return true;
        };
        return false;
    }

    checkExist(val){
        for(let i = 0; i < this.state.arrNormal.length; i++){
            if (this.state.arrNormal[i] == val)
                return true;
        };
        return false;
    }

    hdlDel(data)
    {
        if (this.state.arrSelect.length < 2)
        {
            // alert("chipSettingWarning", "errMsg", "fail");
            alert("length > 0");
            return;
        }
        let val = data == "" ? 0 : parseInt(data);

        this.state.arrSelect.splice(this.state.arrSelect.indexOf(val), 1);
        this.state.arrNormal = this.state.arrSelect.concat();
        let arr = this.state.arrSelect.concat();
        this.setState({
            arrShow:arr
        });
    }



    render() {
        if(!this.state.isShow)
            return(<div></div>);
        let jsxCol = [];
        let obj;
        let isFull;
        for (let i = 0; i < this.state.arrShow.length; i++){
            obj = this.state.arrShow[i];
            isFull = (this.state.arrShow.length < 6 && i == this.state.arrShow.length-1) ? false : true;
            jsxCol.push(
                <ChipSettingItem key={Math.random()} id={i+1} isFull={isFull} value={obj} hdlDel={this.hdlDel.bind(this)} hdlInsert={this.hdlInsert.bind(this)} hdlChange={this.hdlChange.bind(this)}/>
            );
        }
        return (
            <div className="chip-setting-panel">
                <div className="container">
                    <div className="header">
                        <span>{T.translate('lbTitleChipAmt')}</span>
                        <img src="img/close.png" width='21' height='20' onClick={this.close.bind(this)}/>
                    </div>
                    <span style={{minHeight:'55px', display:'flex'}}>{T.translate('lbDesChipAmt')}</span>
                    <div className="content">
                        {jsxCol}
                    </div>
                    <div className="footer">
                        <button type="button" id ='save' onClick={this.confirm.bind(this)}>{T.translate('lblOk')}</button>&nbsp;
                        <button type="button" id ='clear' onClick={this.clearBet.bind(this)}>{T.translate('btnCancel')}</button>
                    </div>
                    <span id="text_save" style={{visibility:'hidden', color:'#db2222', textAlign:'center', width:'250px', position:'absolute'}}>{T.translate('lbSave')}</span>
                </div>
            </div>
        )
    }
}
