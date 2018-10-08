/**
 * Created by carter on 10/5/2018.
 */
import React, {Component, PropTypes} from 'react';
import  Pagination from 'react-js-pagination';
import  ResultHistoryItem from './ResultHistoryItem';
import DisplayUtil from '../util/DisplayUtil';

const ITEM_PER_PAGE = 10;

export default class ResultHistoryPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arr:[
                {
                    TbID:80,
                    drawNo:'123456789',
                    date: '05/10/2018',
                    arrRes:[1,2,3,4,5,6,7,8,9,10]
                },
                {
                    TbID:80,
                    drawNo:'123456789',
                    date: '05/10/2018',
                    arrRes:[1,2,3,4,5,6,7,8,9,10]
                },{
                    TbID:80,
                    drawNo:'123456789',
                    date: '05/10/2018',
                    arrRes:[1,2,3,4,5,6,7,8,9,10]
                },
                {
                    TbID:80,
                    drawNo:'123456789',
                    date: '05/10/2018',
                    arrRes:[1,2,3,4,5,6,7,8,9,10]
                },
                {
                    TbID:80,
                    drawNo:'123456789',
                    date: '05/10/2018',
                    arrRes:[1,2,3,4,5,6,7,8,9,10]
                },
                {
                    TbID:80,
                    drawNo:'123456789',
                    date: '05/10/2018',
                    arrRes:[1,2,3,4,5,6,7,8,9,10]
                },
                {
                    TbID:80,
                    drawNo:'123456789',
                    date: '05/10/2018',
                    arrRes:[1,2,3,4,5,6,7,8,9,10]
                },
                {
                    TbID:80,
                    drawNo:'123456789',
                    date: '05/10/2018',
                    arrRes:[1,2,3,4,5,6,7,8,9,10]
                },
                {
                    TbID:80,
                    drawNo:'123456789',
                    date: '05/10/2018',
                    arrRes:[1,2,3,4,5,6,7,8,9,10]
                },
                {
                    TbID:80,
                    drawNo:'123456789',
                    date: '05/10/2018',
                    arrRes:[1,2,3,4,5,6,7,8,9,10]
                }
            ]
        }
    }
    componentDidMount() {
        this.selectDate();
    }

    hideMenu(e){
        if(this.props.onClickClosePopup){
            this.props.onClickClosePopup();
        }
    }

    handlePageChange(pageNumber) {
        this.setState({
            activePage: pageNumber
        });
        // this.getHistoryRpt.bind(this);
    }

    selectDate(){
        let date = new Date();
        console.log("123: " + new Date((date.getMonth() +1) + "/" + (date.getDate() - 1) + "/" + date.getFullYear()));
        $('[data-date-time]').datetimepicker({
            format: 'DD/MM/YYYY',
            defaultDate:new Date((date.getMonth()) + "/" + (date.getDate() - 1) + "/" + date.getFullYear())
        });
    }

    chooseNum(e){
        var $box = $(e.currentTarget);
        if ($box.is(":checked")) {
            var group = "input:checkbox[name='" + $box.attr("name") + "']";
            $(group).prop("checked", false);
            $box.prop("checked", true);
        } else {
            $box.prop("checked", false);
        }
    }

    render() {
        let jsxCol = [];
        let obj;
        for (let i = 0; i < this.state.arr.length; i++){
            obj = this.state.arr[i];
            jsxCol.push(
                <ResultHistoryItem ref={'tb'+ obj.TbID} key={i+ 1} TbID={obj.TbID} date={obj.date} drawNo={obj.drawNo} arrRes={obj.arrRes}/>
            );
        }
        this.totalRow = this.state.data ? this.state.data.totalRow : 100;
        return (
            <div className="result-rpt">
                <div className="top" style={DisplayUtil.backgroundStyle('img/bgTopRpt.png')}>
                    <div className="icon" tabIndex={0} style={DisplayUtil.backgroundStyle('img/menu_game.png')} onClick={this.hideMenu.bind(this)}></div>
                </div>
                <div className="title">
                    <div className="id">Select Number:</div>
                    <div className="label-num">
                        <input type="checkbox" checked="checked" onChange={this.chooseNum.bind(this)} className="radio" value="1" name="num" onClick={this.chooseNum.bind(this)}/>1</div>
                    <div className="label-num">
                        <input type="checkbox" className="radio" value="1" name="num" onClick={this.chooseNum.bind(this)}/>2</div>
                    <div className="label-num">
                        <input type="checkbox" className="radio" value="1" name="num" onClick={this.chooseNum.bind(this)}/>3</div>
                    <div className="label-num">
                        <input type="checkbox" className="radio" value="1" name="num" onClick={this.chooseNum.bind(this)}/>4</div>
                    <div className="label-num">
                        <input type="checkbox" className="radio" value="1" name="num" onClick={this.chooseNum.bind(this)}/>5</div>
                    <div className="label-num">
                        <input type="checkbox" className="radio" value="1" name="num" onClick={this.chooseNum.bind(this)}/>6</div>
                    <div className="label-num">
                        <input type="checkbox" className="radio" value="1" name="num" onClick={this.chooseNum.bind(this)}/>7</div>
                    <div className="label-num">
                        <input type="checkbox" className="radio" value="1" name="num" onClick={this.chooseNum.bind(this)}/>8</div>
                    <div className="label-num">
                        <input type="checkbox" className="radio" value="1" name="num" onClick={this.chooseNum.bind(this)}/>9</div>
                    <div className="label-num">
                        <input type="checkbox" className="radio" value="1" name="num" onClick={this.chooseNum.bind(this)}/>10</div>

                    <button type="button" className="btn-select">Select</button>
                    <div className="wrap-date">
                        <div className="input-group" data-date-time="" >
                            <input className="input-date" id="from" placeholder="07/07/2017" type="text"/>
                            <span className="input-group-addon" onClick={this.selectDate.bind(this)} style={DisplayUtil.backgroundStyle('img/iconSelect.png')}></span>
                        </div>
                    </div>
                </div>
                <div className="res-container">
                    <div className="result-item">
                        <div className="info">drawNo</div>
                        <div className="list">Result</div>
                    </div>
                    {jsxCol}
                </div>
                <div className="paging">
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={ITEM_PER_PAGE}
                        totalItemsCount={this.totalRow}
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
