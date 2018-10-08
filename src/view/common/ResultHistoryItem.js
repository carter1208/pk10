/**
 * Created by carter on 10/5/2018.
 */
import React, {Component, PropTypes} from 'react';

export default class ResultHistoryItem extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
    }

    render() {
        return (
            <div className="result-item">
                <div className="info">{this.props.drawNo + ' ' + this.props.date}</div>
                <div className="list">
                    <div className="rank"><span className={'text-center num' +this.props.arrRes[0]}>{this.props.arrRes[0]}</span></div>
                    <div className="rank"><span className={'num' +this.props.arrRes[1]}>{this.props.arrRes[1]}</span></div>
                    <div className="rank"><span className={'num' +this.props.arrRes[2]}>{this.props.arrRes[2]}</span></div>
                    <div className="rank"><span className={'num' +this.props.arrRes[3]}>{this.props.arrRes[3]}</span></div>
                    <div className="rank"><span className={'num' +this.props.arrRes[4]}>{this.props.arrRes[4]}</span></div>
                    <div className="rank"><span className={'num' +this.props.arrRes[5]}>{this.props.arrRes[5]}</span></div>
                    <div className="rank"><span className={'num' +this.props.arrRes[6]}>{this.props.arrRes[6]}</span></div>
                    <div className="rank"><span className={'num' +this.props.arrRes[7]}>{this.props.arrRes[7]}</span></div>
                    <div className="rank"><span className={'num' +this.props.arrRes[8]}>{this.props.arrRes[8]}</span></div>
                    <div className="rank"><span className={'num' +this.props.arrRes[9]}>{this.props.arrRes[9]}</span></div>
                </div>
            </div>
        )
    }
}
