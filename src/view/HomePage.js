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
            sence: LOBBY
        }
    }
    componentDidMount() {
        model.subscribe(Command.OPEN_TABLE, this);
    }
    componentWillUnmount(){
        model.unsubscribe(Command.OPEN_TABLE, this);
    }
    update(command, data) {
        switch (command) {
            case Command.OPEN_TABLE:
                this.setState({
                    tbID:data,
                    sence: GAME
                });
                break;
        }
    }
    render() {
        let jsx = this.state.sence == LOBBY ? <Lobby/> : <Game key={Math.random()} tbID={this.state.tbID}/>;
        return (
            <div className="main-page">
                {jsx}
            </div>
        )
    }
}