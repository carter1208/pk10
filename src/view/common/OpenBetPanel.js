/**
 * Created by carter on 10/3/2018.
 */
import React, {Component, PropTypes} from 'react';
import  Pagination from 'react-js-pagination';
import  OpenBetItem from './OpenBetItem';
import  {model} from '../../model/Model';
import  {T} from '../../model/language/Translator';
import  {lobbyServer} from '../../controller/ServerLobby';
import DisplayUtil from '../util/DisplayUtil';
import  Command from '../../constant/Command';

const ITEM_PER_PAGE = 10;

export default class OpenBetPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: 1,
            totalRow: 0,
            arr: [],
            data:null
        };
    }
    componentDidMount() {
        model.subscribe(Command.REPORT_RECENT_BET, this);
        lobbyServer.getRecentBetReport("0", 1, ITEM_PER_PAGE, 1);
    }

    componentWillUnmount() {
        this.mounted = false;
        model.unsubscribe(Command.REPORT_RECENT_BET, this);
    }

    handlePageChange(pageNumber) {
        lobbyServer.getRecentBetReport("0", pageNumber, ITEM_PER_PAGE, 0);
    }

    hideMenu(e){
        if(this.props.onClickClosePopup){
            this.props.onClickClosePopup();
        }
    }

    update(command, data) {
        switch (command) {
            case Command.REPORT_RECENT_BET:
                this.setState({
                    arr: data ? data.records : [],
                    activePage: data ? parseInt(data.page): 1,
                    totalRow: data ? parseInt(data.totalRow): 0,
                    data:data
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
                <OpenBetItem ref={'tb'+ obj.TbID} key={i+ 1} TbID={obj.TbID} ticketNo={obj.ticketNo} date={obj.date} drawNo={obj.drawNo} betType={obj.betType} betValue={obj.betValue} />
            );
        }
        return (
            <div className="open-bet">
                <div className="top" style={DisplayUtil.backgroundStyle('img/bgTopRpt.png')}>
                    <div className="icon" tabIndex={0} style={DisplayUtil.backgroundStyle('./img/menu_game.png')} onClick={this.hideMenu.bind(this)}></div>
                    <div className="name">{T.translate('lblOpenBetting').toUpperCase()}</div>
                </div>
                <div className="open-container">
                    <div className="header" style={{fontWeight:'bold'}}>
                        <div className="title">{T.translate('lblGame').toUpperCase()}</div>
                        <div className="trans">{T.translate('lblTranId').toUpperCase()}</div>
                        <div className="date">{T.translate('lblDate').toUpperCase()}</div>
                        <div>{T.translate('lblDrawNo').toUpperCase()}</div>
                        <div className="betcode">{T.translate('lblBetCode').toUpperCase()}</div>
                        <div>{T.translate('lblBetAmt').toUpperCase()}</div>
                    </div>
                    {jsxCol}
                </div>
                <div className="paging" style={{visibility:this.state.totalRow > 0 ? 'visible':'hidden'}}>
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={ITEM_PER_PAGE}
                        totalItemsCount={this.state.totalRow}
                        pageRangeDisplayed={5}
                        onChange={::this.handlePageChange.bind(this)}
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
