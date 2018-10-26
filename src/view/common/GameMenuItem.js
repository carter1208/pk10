/**
 * Created by carter on 10/26/2018.
 */

import React, {Component, PropTypes} from 'react';
export default class GameMenuItem extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="game-menu-item">
                <img src="img/mcPic.png" width='auto' height='auto'/>
                <div>NEW SLOT GAME {this.props.id}</div>
            </div>
        )
    }
}