/**
 * Created by carter on 10/1/2018.
 */
import React, {Component, PropTypes} from 'react';
import DisplayUtil from '../util/DisplayUtil'

export default class RankPanel extends Component {
    constructor(props){
        super(props);
        this.state = {
            arrRes:[2,5,4,10,6,3,8,7,1,9]
        }
    }
    componentDidMount() {
    }

    updateRank(arr){
        this.setState({
            arrRes:arr
        });
    }

    render() {
        return (
            <div className="rank">
                <div className="top3">
                    <div className="pos">
                        <div className="info">
                            <div className={'num' + this.state.arrRes[0]} id="num">{this.state.arrRes[0]}</div>
                            <div className="idx">1ST</div>
                        </div>
                        <img src={'img/car-' + this.state.arrRes[0] + '.png'} width={150} height={49.5}/>
                    </div>
                    <div className="pos">
                        <div className="info">
                            <div className={'num' + this.state.arrRes[1]} id="num">{this.state.arrRes[1]}</div>
                            <div className="idx">2ND</div>
                        </div>
                        <img src={'img/car-' + this.state.arrRes[1]+ '.png'} width={130} height={43}/>
                    </div>
                    <div className="pos">
                        <div className="info">
                            <div className={'num' + this.state.arrRes[2]} id="num">{this.state.arrRes[2]}</div>
                            <div className="idx">3RD</div>
                        </div>
                        <img src={'img/car-' + this.state.arrRes[2]+ '.png'} width={130} height={43}/>
                    </div>
                </div>
                <div className="list">
                    <div className="pos">
                        <div className={'num' + this.state.arrRes[3]} id="num">{this.state.arrRes[3]}</div>
                        <div className="idx">4TH</div>
                    </div>
                    <div className="pos">
                        <div className={'num' + this.state.arrRes[4]} id="num">{this.state.arrRes[4]}</div>
                        <div className="idx">5TH</div>
                    </div>
                    <div className="pos">
                        <div className={'num' + this.state.arrRes[5]} id="num">{this.state.arrRes[5]}</div>
                        <div className="idx">6TH</div>
                    </div>
                    <div className="pos">
                        <div className={'num' + this.state.arrRes[6]} id="num">{this.state.arrRes[6]}</div>
                        <div className="idx">7TH</div>
                    </div>
                    <div className="pos">
                        <div className={'num' + this.state.arrRes[7]} id="num">{this.state.arrRes[7]}</div>
                        <div className="idx">8TH</div>
                    </div>
                    <div className="pos">
                        <div className={'num' + this.state.arrRes[8]} id="num">{this.state.arrRes[8]}</div>
                        <div className="idx">9TH</div>
                    </div>
                    <div className="pos">
                        <div className={'num' + this.state.arrRes[9]} id="num">{this.state.arrRes[9]}</div>
                        <div className="idx">10TH</div>
                    </div>
                </div>
            </div>
        )
    }
}