/**
 * Created by carter on 10/3/2018.
 */
import React, {Component, PropTypes} from 'react';
import  Pagination from 'react-js-pagination';
import  ResultBettingItem from './ResultBettingItem';
import  {model} from '../../model/Model';
import  {lobbyServer} from '../../controller/ServerLobby';
import  Command from '../../constant/Command';
import  SelectChannel from '../../component/SelectChannel';
import DisplayUtil from '../util/DisplayUtil';

const ITEM_PER_PAGE = 10;

export default class ResultBettingPanel extends Component {
    constructor(props) {
        super(props);
        this.cutOffDate = {
            cutOff1:'23:59:59',
            cutOff2:'08:59:59',
            cutOff3:'11:59:59',
            cutOff4:'12:59:59'
        }
        this.totalRow = 100;
        this.state = {
            activePage: 1,
            arr: [],
            data:null,
            cutOff: '00:00:00',
            cutOffTime: this.cutOffDate['cutOff1']
        };
    }

    componentDidMount() {
        model.subscribe(Command.REPORT_BETTING, this);
        this.selectDateFrom();
        this.selectDateTo();
        this.getHistoryRpt();
    }

    componentWillUnmount() {
        this.mounted = false;
        model.unsubscribe(Command.REPORT_BETTING, this);
    }

    getHistoryRpt(pageNo = 1){
        console.log('getHistoryRpt', this.state.fromDate+" "+this.state.cutOff, this.state.toDate+" "+this.state.cutOffTime);
        let dateF = document.getElementById('from').value.split('/');
        let dateT = document.getElementById('to').value.split('/');
        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let monthF = parseInt(dateF[1]);
        let monthT = parseInt(dateT[1]);
        let fromdate = dateF[0] + '-' + months[monthF - 1] + '-' + dateF[2];
        let todate = dateT[0] + '-' + months[monthT - 1] + '-' + dateT[2];
        if(new Date(fromdate) < new Date(todate) ) {
            lobbyServer.getBettingReport('0', dateF[0] + '/' + months[monthF - 1] + '/' + dateF[2]+" "+this.state.cutOff, dateT[0] + '/' + months[monthT - 1] + '/' + dateT[2] +" "+ this.state.cutOffTime, pageNo ,ITEM_PER_PAGE, 1);
        }else{
            alert('fromDate is lower todate')
        }
    }

    handlePageChange(pageNumber) {
        this.getHistoryRpt(pageNumber);
    }

    hdlChangeCutOff(val){
        this.state.cutOff = val.label;
        this.state.cutOffTime = this.cutOffDate[val.value];
        $('.toCutOff').text(this.cutOffDate[val.value]);
    }

    setData(data){
        this.setState({
            arr: data ? data.records : [],
            activePage: data ? parseInt(data.page): 1,
            totalRow: data ? parseInt(data.totalRow): 0,
            data:data
        });
    }

    update(command, data) {
        switch (command) {
            case Command.REPORT_BETTING:
                model._objOpen = data;
                this.setData(data);
                break;
        }
    }

    selectDateFrom(){
        let date = new Date();
        console.log("123: " + new Date((date.getMonth() +1) + "/" + (date.getDate() - 1) + "/" + date.getFullYear()));
        $('[data-date-time-from]').datetimepicker({
            format: 'DD/MM/YYYY',
            defaultDate:new Date((date.getMonth() + 1) + "/" + (date.getDate() - 1) + "/" + date.getFullYear())
        });
    }

    selectDateTo(){
        $('[data-date-time-to]').datetimepicker({
            format: 'DD/MM/YYYY',
            defaultDate:new Date()
        });
    }

    onSearch(e){
        this.getHistoryRpt();
    }

    hideMenu(e){
        if(this.props.onClickClosePopup){
            this.props.onClickClosePopup();
        }
    }

    render() {
        let jsxCol = [];
        let obj;
        for (let i = 0; i < this.state.arr.length; i++){
            obj = this.state.arr[i];
            jsxCol.push(
                <ResultBettingItem ref={'tb'+ obj.TbID} key={i+ 1} TbID={obj.TbID} date={obj.date} trans={obj.ticketNo} drawno={obj.drawNo} betcode={obj.betDetail} betamt={obj.stake} winloss={obj.winloss} result={obj.result}/>
            );
        }
        return (
            <div className="betting-rpt">
                <div className="top" style={DisplayUtil.backgroundStyle('img/bgTopRpt.png')}>
                    <div className="icon" tabIndex={0} style={DisplayUtil.backgroundStyle('./img/menu_game.png')} onClick={this.hideMenu.bind(this)}></div>
                </div>
                <div className="date-picker">
                    <div className="form-group">
                        <span className="text-right txt-date">From:</span>
                        <div className="wrap-date">
                            <div className="input-group" data-date-time-from="" >
                                <input className="input-date" id="from" placeholder="07/07/2017" type="text"/>
                                <span className="input-group-addon" onClick={this.selectDateTo.bind(this)} style={DisplayUtil.backgroundStyle('img/iconSelect.png')}></span>
                            </div>
                        </div>
                        <div className="cbCutOff">
                            <SelectChannel options={[
                                { label: '00:00:00', value: 'cutOff1'},
                                { label: '09:00:00', value: 'cutOff2'},
                                { label: '12:00:00', value: 'cutOff3'},
                                { label: '13:00:00', value: 'cutOff4'}
                            ]}
                            onChangeSelect={this.hdlChangeCutOff.bind(this)}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <span className="text-right txt-date">To:</span>
                        <div className="wrap-date">
                            <div className="input-group" data-date-time-to="" >
                                <input className="input-date" id="to" placeholder="07/07/2017" type="text"/>
                                <span className="input-group-addon" onClick={this.selectDateTo.bind(this)} style={DisplayUtil.backgroundStyle('img/iconSelect.png')}></span>
                            </div>
                        </div>
                        <span className="toCutOff" style={{paddingLeft:'10px', fontSize:'12pt'}}>{this.state.cutOffTime}</span>
                    </div>
                    <button type="button" className="btn-select-line" onMouseDown={this.onSearch.bind(this)}>Search</button>
                </div>
                <div className="betting-container">
                    <div className="header" style={{fontWeight:'bold'}}>
                        <div className="title">GAME</div>
                        <div className="trans">TRANS ID</div>
                        <div className="date">DATE TIME</div>
                        <div>DRAW NO</div>
                        <div className="betcode">BET CODE</div>
                        <div>BET AMOUNT</div>
                        <div>WIN/LOSS</div>
                        <div>RESULT</div>
                    </div>
                    {jsxCol}
                </div>
                <div className="paging" style={{visibility:this.state.totalRow > 0 ? 'visible':'hidden'}}>
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
