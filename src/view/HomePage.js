/**
 * Created by carter on 9/27/2018.
 */
import React, {Component, PropTypes} from 'react';
import Game from "./lottery/Lottery";
import Lobby from "./lobby/Lobby";
const LOBBY = "LOBBY";
const GAME = "GAME";
export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sence: LOBBY
        }
    }
    componentDidMount() {

    }
    componentWillUnmount(){

    }
    update(command, data) {

    }
    render() {
        let jsx = this.state.sence == LOBBY ? <Lobby/> : <Game key={Math.random()}/>;
        return (
            <div className="main-page">
                {jsx}
            </div>
        )
    }
}