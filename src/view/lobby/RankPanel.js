/**
 * Created by carter on 10/1/2018.
 */
import React, {Component, PropTypes} from 'react';
import DisplayUtil from '../util/DisplayUtil'
import {T} from '../../model/language/Translator'

export default class RankPanel extends Component {
    constructor(props){
        super(props);
        this.state = {
            arrRes:[2,5,4,10,6,3,8,7,1,9],
            drawNo:'123456'
        }
    }
    componentDidMount() {
    }

    updateRank(data){
        this.setState({
            arrRes:data.numbers,
            drawNo:data.drawNo
        });
    }

    render() {
        return (
            <div className="rank">
                <div className="drawNo" style={{height:'45px', lineHeight:'45px'}}>{T.translate('lblDrawNo').toUpperCase() + this.state.drawNo}</div>
                <div className="top3">
                    <div className="pos">
                        <div className="info">
                            <div className={'num' + this.state.arrRes[0]} id="num">{this.state.arrRes[0]}</div>
                            <div className="idx">{T.translate('lbl1')}</div>
                        </div>
                        <img src={'img/car-' + this.state.arrRes[0] + '.png'} width={150} height={49.5}/>
                    </div>
                    <div className="pos">
                        <div className="info">
                            <div className={'num' + this.state.arrRes[1]} id="num">{this.state.arrRes[1]}</div>
                            <div className="idx">{T.translate('lbl2')}</div>
                        </div>
                        <img src={'img/car-' + this.state.arrRes[1]+ '.png'} width={130} height={43}/>
                    </div>
                    <div className="pos">
                        <div className="info">
                            <div className={'num' + this.state.arrRes[2]} id="num">{this.state.arrRes[2]}</div>
                            <div className="idx">{T.translate('lbl3')}</div>
                        </div>
                        <img src={'img/car-' + this.state.arrRes[2]+ '.png'} width={130} height={43}/>
                    </div>
                </div>
                <div className="list">
                    <div className="pos">
                        <div className={'num' + this.state.arrRes[3]} id="num">{this.state.arrRes[3]}</div>
                        <div className="idx">{T.translate('lbl4')}</div>
                    </div>
                    <div className="pos">
                        <div className={'num' + this.state.arrRes[4]} id="num">{this.state.arrRes[4]}</div>
                        <div className="idx">{T.translate('lbl5')}</div>
                    </div>
                    <div className="pos">
                        <div className={'num' + this.state.arrRes[5]} id="num">{this.state.arrRes[5]}</div>
                        <div className="idx">{T.translate('lbl6')}</div>
                    </div>
                    <div className="pos">
                        <div className={'num' + this.state.arrRes[6]} id="num">{this.state.arrRes[6]}</div>
                        <div className="idx">{T.translate('lbl7')}</div>
                    </div>
                    <div className="pos">
                        <div className={'num' + this.state.arrRes[7]} id="num">{this.state.arrRes[7]}</div>
                        <div className="idx">{T.translate('lbl8')}</div>
                    </div>
                    <div className="pos">
                        <div className={'num' + this.state.arrRes[8]} id="num">{this.state.arrRes[8]}</div>
                        <div className="idx">{T.translate('lbl9')}</div>
                    </div>
                    <div className="pos">
                        <div className={'num' + this.state.arrRes[9]} id="num">{this.state.arrRes[9]}</div>
                        <div className="idx">{T.translate('lbl10')}</div>
                    </div>
                </div>
            </div>
        )
    }
}