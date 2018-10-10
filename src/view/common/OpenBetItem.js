/**
 * Created by carter on 10/3/2018.
 */
import React, {Component, PropTypes} from 'react';

export default class OpenBetItem extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
    }
    componentWillUnmount() {
    }


    render() {
        let logoID = 'img/logo'+ (this.props.TbID == 77 ? "_"+ this.props.TbID: this.props.TbID) +'.png';
        return (
            <div className="open-bet-item">
                <div className="title">
                    <img className="logo" src='img/pk10Menu.png' width='40%' height='40%'></img>&nbsp;&nbsp;
                    <img className="logo1" src={logoID} width='40%' height='40%'></img>
                </div>
                <div className="trans">{this.props.ticketNo}</div>
                <div className="date">{this.props.date}</div>
                <div>{this.props.drawNo}</div>
                <div className="betcode">{this.props.betType}</div>
                <div>{this.props.betValue}</div>
            </div>
        )
    }
}

