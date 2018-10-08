/**
 * Created by carter on 9/7/2018.
 */
import Game from './Game'

export default class GameLottery extends Game{
    constructor(props){
        super(props);
        this.dtime ='';
        this.timer = new ATimer();
        let strTime = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDay() + " " + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();
        this.state = {
            drawNo:'123456',
            countDownTime:'00:00',
            idResult:'12345678910',
            lbResult:'DrawNo',
            dateTime:this.updateDateTime(strTime),
            total:'0',
            bigSmall:'B',
            oddEven:'O',
            d1:'T',
            d2:'T',
            d3:'T',
            d4:'T',
            d5:'T'
        }
    }
    reset(){
        super.reset()
    }
    render(){
        return(
            <div className="game">
                <div className="game-canvas-container" ref="canvasContainer"/>
                <div className="dateTime">
                    <div className="drawNo">
                        <div className="lbCurrDraw">
                            Current Drawno
                        </div>
                        <div className="txtCurrDraw">
                            {this.state.drawNo}
                        </div>
                    </div>
                    <div className="time">
                        <div className="txtTime">
                            {this.state.countDownTime}
                        </div>
                    </div>
                </div>
                <div className="result" id="resultInfo">
                    <div className="drawNo">
                        {this.state.lbResult}  {this.state.idResult}
                    </div>
                    <div className="time">
                        {this.state.dateTime}
                    </div>
                </div>
                <div className="stat">
                    <div className="total">
                        <span>Top 3</span>
                        <p className="total">{this.state.total}</p>
                        <p className="bs">{this.state.bigSmall}</p>
                        <p className="ov">{this.state.oddEven}</p>
                    </div>
                    <div className="dt">
                        <span>Dragon/Tiger</span>
                        <p className="d1">{this.state.d1}</p>
                        <p className="d2">{this.state.d2}</p>
                        <p className="d3">{this.state.d3}</p>
                        <p className="d4">{this.state.d4}</p>
                        <p className="d5">{this.state.d5}</p>
                    </div>
                </div>
            </div>
        )
    }
}
