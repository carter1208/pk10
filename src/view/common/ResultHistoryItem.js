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

    getPosition(id, num){
        this.removeBg(num);
        if(num == 0) return null;
        var div = document.getElementsByClassName( 'result-item' )[id + 1];
        var div1 = div.getElementsByClassName('text-center num'+num);
        var left = div1[0].offsetLeft + 15;
        var top = div1[0].offsetTop + 15;
        var p = {top:top, left:left};
        return p;
    }

    removeBg(num){
        for(let i=1; i <= 10; i++){
            let name = '.num'+i;
            if(num == 0){
                $(name).removeClass('active');
                continue;
            }
            if(i== num){
                $(name).removeClass('active');
                continue;
            }
            $(name).addClass('active');
        }
    }

    render() {
        return (
            <div className="result-item">
                <div className="info">
                    <span style={{fontWeight:'bold'}}>{this.props.drawNo} </span>
                    &nbsp;
                    {this.props.date}
                </div>
                <div className="list">
                    <div className="rank"><span className={'text-center num' +this.props.arrRes[0]}>{this.props.arrRes[0]}</span></div>
                    <div className="rank"><span className={'text-center num' +this.props.arrRes[1]}>{this.props.arrRes[1]}</span></div>
                    <div className="rank"><span className={'text-center num' +this.props.arrRes[2]}>{this.props.arrRes[2]}</span></div>
                    <div className="rank"><span className={'text-center num' +this.props.arrRes[3]}>{this.props.arrRes[3]}</span></div>
                    <div className="rank"><span className={'text-center num' +this.props.arrRes[4]}>{this.props.arrRes[4]}</span></div>
                    <div className="rank"><span className={'text-center num' +this.props.arrRes[5]}>{this.props.arrRes[5]}</span></div>
                    <div className="rank"><span className={'text-center num' +this.props.arrRes[6]}>{this.props.arrRes[6]}</span></div>
                    <div className="rank"><span className={'text-center num' +this.props.arrRes[7]}>{this.props.arrRes[7]}</span></div>
                    <div className="rank"><span className={'text-center num' +this.props.arrRes[8]}>{this.props.arrRes[8]}</span></div>
                    <div className="rank"><span className={'text-center num' +this.props.arrRes[9]}>{this.props.arrRes[9]}</span></div>
                </div>
            </div>
        )
    }
}
