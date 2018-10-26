/**
 * Created by loc on 8/3/2017.
 */
import React, {Component, PropTypes} from 'react';
import BetStatus from '../view/common/OpenBetPanel';
import Betting from '../view/common/ResultBettingPanel';
import Result from '../view/common/ResultHistoryPanel';
import {model} from '../model/Model';
import EventType from '../constant/EventType';
import { Redirect } from 'react-router-dom'

export default class PopupContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            name: ""
        }
        this.showPopup = this.showPopup.bind(this);
    }
    componentDidMount() {
        model.subscribe(EventType.SHOW_POPUP, this);
    }
    componentWillUnmount() {
        this.mounted = false;
        model.unsubscribe(EventType.SHOW_POPUP, this);
    }

    hidePopup() {
        this.setState({isShow:false, name:''});
    }

    showPopup(name) {
        this.setState({
            isShow: true,
            name: name
        });
    }

    onClickClose() {
        this.setState({isShow:false, name:''})
    }

    update(command, data) {
        switch (command) {
            case EventType.SHOW_POPUP:
                this.showPopup(data);
                break;
        }
    }

    render() {
        let jsx = "";
        if (!this.state.isShow) {
            return <div></div>;
        }
        switch (this.state.name) {
            case EventType.PP_BET_STATUS:
                jsx = (
                    <BetStatus onClickClosePopup={this.onClickClose.bind(this)}/>
                );
                break;
            case EventType.PP_RESULT_RPT:
                jsx = (
                    <Result onClickClosePopup={this.onClickClose.bind(this)}/>
                );
                break;
            case EventType.PP_BETTING:
                jsx = (
                    <Betting onClickClosePopup={this.onClickClose.bind(this)}/>
                );
                break;
            case EventType.PP_GAMERULE:
                jsx = (
                    <Redirect to='/resource/E/gamerule.html' />
                );
                break;
        }
        return (
            <div className="overlay" style={{zIndex:10, width:1440, height:880}}>
                {jsx}
            </div>
        )
    }
}
