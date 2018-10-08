/**
 * Created by carter on 10/3/2018.
 */
import React, {Component, PropTypes} from 'react';
import  Pagination from 'react-js-pagination';
import  OpenBetItem from './OpenBetItem';
import  {model} from '../../model/Model';
import  {lobbyServer} from '../../controller/ServerLobby';

const ITEM_PER_PAGE = 10;

export default class OpenBetPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: 1,
            arr: [],
            data:null
        };
    }
    componentDidMount() {
        model.subscribe(Command.REPORT_RECENT_BET, this);
        lobbyServer.getRecentBetReport("0", 1, ITEM_PER_PAGE, 1);
    }

    handlePageChange(pageNumber) {
        lobbyServer.getRecentBetReport("0", pageNumber, ITEM_PER_PAGE, 0);
    }

    update(command, data) {
        switch (command) {
            case Command.REPORT_RECENT_BET:
                this.setState({
                    arr: data.records,
                    activePage: parseInt(data.page),
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
        this.totalRow = this.state.data.totalRow;
        return (
            <div className="open-bet">
                <div className="top" style={DisplayUtil.backgroundStyle('img/bgTopRpt.png')}>
                    <div className="icon" tabIndex={0} style={DisplayUtil.backgroundStyle('./img/menu_game.png')} onClick={this.hideMenu.bind(this)}></div>
                </div>
                {jsxCol}
                <div>
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={ITEM_PER_PAGE}
                        totalItemsCount={this.totalRow}
                        pageRangeDisplayed={5}
                        onChange={::this.handlePageChange.bind(this)}
                    />
                </div>
            </div>
        )
    }
}
