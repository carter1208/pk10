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
        let idxMin = arrValue.findIndex((item) => {return item >= minValue})
        let idxMax = arrValue.findIndex((item) => {return item > maxValue}) - 1;
        let arrTemp = arrValue.slice(idxMin,idxMax + 1);
        arrDefault = this.random_elems(arrTemp, 6);
        return arrDefault;
    }

    random_elems(arr, count) {
        let len = arr.length;
        let lookup = {};
        let tmp = [];
        if (count > len)
            count = len;
        for (let i = 0; i < count; i++) {
            let index;
            do {
                index = ~~(Math.random() * len);
            } while (index in lookup);
            lookup[index] = null;
            tmp.push(arr[index]);
        }
        return tmp;
    }

    show(){
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
        this.show();
    }

    confirm(e){
        if (!this.state.arrSelect.every(this.checkEmpty))
        {
            alert("the value must be larger than 0 or not empty.", "errMsg", "fail");
            return;
        }
        let arrNewVal = this.compareArray(this.state.arrSelect, this.state.arrNormal);
        this.state.arrNormal.push(...arrNewVal);
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
        arr = arrDefault.filter(element => !arrSelected.includes(element));
        return arr;
    }

    close(e){
        this.setState({
            isShow:false
        });
    }

    hdlChange(val){
        this.state.arrSelect = this.state.arrTemp.concat();
        if (this.checkExist(val))
        {
            alert("the value is exist.", "errMsg", "fail");
            return;
        }
        this.state.arrSelect.push(val);
    }

    hdlInsert(){
        if (!this.state.arrSelect.every(this.checkEmpty))
        {
            alert("the value must be larger than 0 or not empty.", "errMsg", "fail");
            return;
        }
        let arr1 = this.state.arrSelect.filter(function(value){ return value != 0});
        this.state.arrTemp = arr1.concat();
        this.state.arrNormal = arr1.concat();

        this.state.arrSelect.push(0);
        let arr = this.state.arrSelect.concat();
        this.setState({
            arrShow:arr
        });
    }

    checkEmpty(value){
        return value > 0;
    }

    checkExist(val){
        let boolArr = this.state.arrNormal.includes(val)
        return boolArr;
    }

    hdlDel(data)
    {
        if (this.state.arrSelect.length < 2)
        {
            alert(T.translate('chipSettingWarning'));
            return;
        }
        let val = data == "" ? 0 : parseInt(data);

        // this.state.arrSelect.splice(this.state.arrSelect.indexOf(val), 1);
        this.state.arrSelect = this.state.arrSelect.filter((s, sidx) => val !== s)
        let arr1 = this.state.arrSelect.filter(function(value){ return value != 0});
        this.state.arrTemp = arr1.concat();
        this.state.arrNormal = arr1.concat();

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
                    <span className="desc" style={{height:'55px', display:'flex', fontSize:'10pt', textAlign:'center', paddingTop:'5px'}}>{T.translate('lbDesChipAmt')}</span>
                    <div className="content">
                        {jsxCol}
                    </div>
                    <div className="footer">
                        <button type="button" id ='save' onClick={this.confirm.bind(this)}>{T.translate('lblOk')}</button>&nbsp;
                        <button type="button" id ='clear' onClick={this.clearBet.bind(this)}>{T.translate('btnCancel')}</button>
                    </div>
                    <span id="text_save" style={{visibility:'hidden', color:'#db2222', textAlign:'center', width:'250px', position:'absolute', paddingTop:'2px'}}>{T.translate('lbSave')}</span>
                </div>
            </div>
        )
    }
}
