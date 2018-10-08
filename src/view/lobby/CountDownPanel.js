/**
 * Created by carter on 10/2/2018.
 */
import React, {Component, PropTypes} from 'react';
import ATimer from '../../component/ATimer'

export default class CountDownPanel extends Component {
    constructor(props){
        super(props);
        this.state= {
            drawNo:'',
            countDownTime:'00:00'
        }
    }
    componentDidMount() {
        this.time = new ATimer();
    }

    onTimerHandler(t){
        let minutes = Math.floor(t / 60);
        let seconds = t % 60;
        if (t <= 0){
            this.timer.stopTimer();
            seconds = 0;
            minutes = 0;
        }
        this.setState({
            countDownTime:(minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds)
        });
    }

    startCountDown(remainTime, drawNo){
        this.time.startTimer(remainTime, this.onTimerHandler.bind(this));
        this.setState({
            drawNo: drawNo
        })
    }

    stopCountDown(remainTime, drawNo){
        this.time.stopTimer();
        this.setState({
            drawNo:drawNo,
            countDownTime:'00:00'
        });
    }

    render() {
        return (
            <div className="countdown">
                <div className="drawNo">
                    <div className="title">Next Draw</div>
                    <div className="draw">{this.state.drawNo}</div>
                </div>
                <div className="time">{this.state.countDownTime}</div>
            </div>
        )
    }
}
