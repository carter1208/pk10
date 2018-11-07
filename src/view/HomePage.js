/**
 * Created by carter on 9/27/2018.
 */
import React, {Component, PropTypes} from 'react';
import Game from "./lottery/Lottery";
import Lobby from "./lobby/Lobby";
import {model} from '../model/Model'
import Command from '../constant/Command'
const LOBBY = "LOBBY";
const GAME = "GAME";
export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tbID:'0',
            isLogin:true,
            isShow:false,
            sence: LOBBY
        }
    }
    componentDidMount() {
        model.subscribe(Command.OPEN_TABLE, this);
        model.subscribe(Command.BACK_LOBBY, this);
    }
    componentWillUnmount(){
        model.unsubscribe(Command.OPEN_TABLE, this);
        model.unsubscribe(Command.BACK_LOBBY, this);
    }

    show(){
        this.setState({isShow:true});
    }
    update(command, data) {
        switch (command) {
            case Command.OPEN_TABLE:
                this.setState({
                    tbID:data,
                    sence: GAME
                });
                break;
            case Command.BACK_LOBBY:
                model.tableId = '0';
                this.refs.game.removeState();
                this.setState({
                    isLogin:false,
                    sence: LOBBY
                });
                break;
        }
    }
    render() {
        if(!this.state.isShow)
            return(<div></div>)
        let jsx = this.state.sence == LOBBY ? <Lobby ref="lobby" isLogin={this.state.isLogin}/> : <Game ref="game" key={Math.random()} tbID={this.state.tbID}/>;
        return (
            <div className="main-page">
                {jsx}
            </div>
        )
    }
}