/**
 * Created by carter on 10/3/2018.
 */
import React, {Component, PropTypes} from 'react';

export default class ResultBettingItem extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
    }


    render() {
        return (
            <div className="betting-item">
                    <div className="title">{this.props.game}</div>
                    <div className="trans">{this.props.trans}</div>
                    <div className="date">{this.props.date}</div>
                    <div>{this.props.drawno}</div>
                    <div className="betcode">{this.props.betcode}</div>
                    <div>{this.props.betamt}</div>
                    <div>{this.props.winloss}</div>
                    <div>{this.props.result}</div>
            </div>
        )
    }
}

