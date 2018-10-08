/**
 * Created by carter on 9/27/2018.
 */
import React, {Component, PropTypes} from 'react';
import Game from '../game/Game'
import BettingPanel from './BettingPanel'
export default class Lottery extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
    }
    componentWillUnmount() {
    }
    render() {
        return (
            <div className="game-container">
                racing...
                <Game/>
                <BettingPanel/>
            </div>
        )
    }
}