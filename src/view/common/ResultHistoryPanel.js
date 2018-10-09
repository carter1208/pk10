/**
 * Created by carter on 10/5/2018.
 */
import React, {Component, PropTypes} from 'react';
import  Pagination from 'react-js-pagination';
import  ResultHistoryItem from './ResultHistoryItem';
import DisplayUtil from '../util/DisplayUtil';
import  {lobbyServer} from '../../controller/ServerLobby';
import  {model} from '../../model/Model';
import  Command from '../../constant/Command';

const ITEM_PER_PAGE = 10;

export default class ResultHistoryPanel extends Component {
    constructor(props) {
        super(props);
        this.arrItem = [];
        this.arrPos = [];
        this.idx = 0;
        this.state = {
            activePage: 1,
            arr:[],
            data:null,
            totalRow:0
        }
    }
    componentDidMount() {
        model.subscribe(Command.REPORT_RESULT, this);
        this.canvas = document.getElementById('line');
        this.ctx = this.canvas.getContext("2d");
        this.selectDate();
        $('[data-date-time-result]').datetimepicker({
            format: 'DD/MM/YYYY'
        }).on('dp.change', this.changeDate.bind(this));
        this.getResultRpt();
    }

    componentWillUnmount(){
        this.mounted = false;
    }

    getResultRpt(page = 1){
        let dateF = document.getElementById('from').value.split('/');
        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let monthF = parseInt(dateF[1]);
        lobbyServer.getResultReport('80',dateF[0] + '/' + months[monthF - 1] + '/' + dateF[2], page, ITEM_PER_PAGE, 1);
    }

    hideMenu(e){
        if(this.props.onClickClosePopup){
            this.props.onClickClosePopup();
        }
    }

    handlePageChange(pageNumber) {
        this.getResultRpt(pageNumber);
    }

    selectDate(){
        let date = new Date();
        console.log("123: " + new Date((date.getMonth() +1) + "/" + (date.getDate() - 1) + "/" + date.getFullYear()));
        $('[data-date-time-result]').datetimepicker({
            format: 'DD/MM/YYYY',
            defaultDate:new Date((date.getMonth() + 1) + "/" + (date.getDate()) + "/" + date.getFullYear())
        });
    }

    chooseNum(e){
        var $box = $(e.currentTarget);
        if ($box.is(":checked")) {
            var group = "input:checkbox[name='" + $box.attr("name") + "']";
            $(group).prop("checked", false);
            $box.prop("checked", true);
            this.idx = parseInt(e.currentTarget.value);
        } else {
            $box.prop("checked", false);
            this.idx = 0 ;
        }
    }

    changeDate(e){
        this.getResultRpt();
    }

    activeLine(e){
        this.drawLine(this.idx);
    }

    removeLine(){
        this.ctx.beginPath();
        this.ctx.clearRect(0,0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

    getColorByNum(num){
        var color;
        switch (num)
        {
            case 1:
                color = '#FFEA00';
                break;
            case 2:
                color = '#389DF4';
                break;
            case 3:
                color = '#616161';
                break;
            case 4:
                color = '#FE790C';
                break;
            case 5:
                color = '#54FBFB';
                break;
            case 6:
                color = '#5E19EF';
                break;
            case 7:
                color = '#DBDBDB';
                break;
            case 8:
                color = '#FE4141';
                break;
            case 9:
                color = '#8E0B0B';
                break;
            case 10:
                color = '#54BD39';
                break;
        }
        return color;
    }

    drawLine(num){
        this.removeLine();
        this.arrPos = [];
        for(var i = 0; i < this.arrItem.length; i++){
            var p = this.refs['item'+(i+1)].getPosition(i, num);
            if(!p) return;
            this.arrPos.push(p);
        }

        for(i = 0; i < this.arrPos.length; i++){
            if(i == this.arrPos.length - 1) return;
            var p1 = this.arrPos[i];
            var p2 = this.arrPos[i+1];
            this.ctx.strokeStyle = this.getColorByNum(num)
            this.ctx.lineWidth = 2;
            this.ctx.moveTo(p1.left,p1.top + 5);
            this.ctx.lineTo(p2.left,p2.top - 10);
            this.ctx.stroke();
        }
    }

    update(command, data) {
        switch (command) {
            case Command.REPORT_RESULT:
                if(!data) return;
                this.setState({
                    arr: data.records,
                    activePage: parseInt(data.page),
                    data:data,
                    totalRow:parseInt(data.totalRow)
                });
                break;
        }
    }
    render() {

        let jsxCol = [];
        let obj;
        for (let i = 0; i < this.state.arr.length; i++){
            obj = this.state.arr[i];
            jsxCol.push(
                <ResultHistoryItem ref={'item'+ (i+1)} key={i+ 1} TbID={obj.tableName} date={obj.date} drawNo={obj.drawNoRef} arrRes={obj.num}/>
            );
        }
        this.arrItem = jsxCol.concat();
        return (
            <div className="result-rpt">
                <div className="top" style={DisplayUtil.backgroundStyle('img/bgTopRpt.png')}>
                    <div className="icon" tabIndex={0} style={DisplayUtil.backgroundStyle('img/menu_game.png')} onClick={this.hideMenu.bind(this)}></div>
                </div>
                <canvas id="line" style={{ left: 0, top:0}} width={'1440px'} height={'720px'}>

                </canvas>
                <div className="title">
                    <div className="id">Select Number:</div>
                    <div className="label-num">
                        <input type="checkbox" className="radio" value="1" name="num" onClick={this.chooseNum.bind(this)}/>1</div>
                    <div className="label-num">
                        <input type="checkbox" className="radio" value="2" name="num" onClick={this.chooseNum.bind(this)}/>2</div>
                    <div className="label-num">
                        <input type="checkbox" className="radio" value="3" name="num" onClick={this.chooseNum.bind(this)}/>3</div>
                    <div className="label-num">
                        <input type="checkbox" className="radio" value="4" name="num" onClick={this.chooseNum.bind(this)}/>4</div>
                    <div className="label-num">
                        <input type="checkbox" className="radio" value="5" name="num" onClick={this.chooseNum.bind(this)}/>5</div>
                    <div className="label-num">
                        <input type="checkbox" className="radio" value="6" name="num" onClick={this.chooseNum.bind(this)}/>6</div>
                    <div className="label-num">
                        <input type="checkbox" className="radio" value="7" name="num" onClick={this.chooseNum.bind(this)}/>7</div>
                    <div className="label-num">
                        <input type="checkbox" className="radio" value="8" name="num" onClick={this.chooseNum.bind(this)}/>8</div>
                    <div className="label-num">
                        <input type="checkbox" className="radio" value="9" name="num" onClick={this.chooseNum.bind(this)}/>9</div>
                    <div className="label-num">
                        <input type="checkbox" className="radio" value="10" name="num" onClick={this.chooseNum.bind(this)}/>10</div>

                    <button type="button" className="btn-select-line" onMouseDown={this.activeLine.bind(this)}>Select</button>
                    <div className="wrap-date">
                        <div className="input-group" data-date-time-result="" >
                            <input className="input-date" id="from" placeholder="07/07/2017" type="text"/>
                            <span className="input-group-addon" onClick={this.selectDate.bind(this)} style={DisplayUtil.backgroundStyle('img/iconSelect.png')}></span>
                        </div>
                    </div>
                </div>
                <div className="res-container">
                    <div className="result-item">
                        <div className="info">DRAW NO</div>
                        <div className="list">RESULT</div>
                    </div>
                    {jsxCol}
                </div>
                <div className="paging">
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={ITEM_PER_PAGE}
                        totalItemsCount={this.state.totalRow}
                        pageRangeDisplayed={5}
                        onChange={this.handlePageChange.bind(this)}
                        firstPageText={<img src={'img/btnLast1.png'}/>}
                        lastPageText={<img src={'img/btnLast.png'}/>}
                        prevPageText={<img src={'img/btnNext1.png'}/>}
                        nextPageText={<img src={'img/btnNext.png'}/>}
                    />
                </div>

            </div>
        )
    }
}
