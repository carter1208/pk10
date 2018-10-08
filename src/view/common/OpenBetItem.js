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
        let logo = "img/logo"+this.props.TbID+".png";
        return (
            <div className="open-bet-item">
                <img src="img/pk10Menu.png"/>
                <img src={logo} width={75} height={30}/>
                <span>{this.props.ticketNo}</span>
                <span>{this.props.date}</span>
                <span>{this.props.drawNo}</span>
                <span>{this.props.betType}</span>
                <span>{this.props.betValue}</span>
            </div>
        )
    }
}

