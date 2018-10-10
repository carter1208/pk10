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
        let logoID = 'img/logo'+ (this.props.TbID == 77 ? "_"+ this.props.TbID: this.props.TbID) +'.png';
        return (
            <div className="betting-item">
                    <div className="title">
                        <img className="logo" src='img/pk10Menu.png' width='40%' height='40%'></img>&nbsp;&nbsp;
                        <img className="logo1" src={logoID} width='40%' height='40%'></img>
                    </div>
                    <div className="trans">{this.props.trans}</div>
                    <div className="date">{this.props.date}</div>
                    <div>{this.props.drawno}</div>
                    <div className="betcode">{this.props.betcode}</div>
                    <div>{this.props.betamt}</div>
                    <div style={{color:parseFloat(this.props.winloss) > 0 ? "#545454":"#db2222"}}>{this.props.winloss}</div>
                    <div>{this.props.result}</div>
            </div>
        )
    }
}

