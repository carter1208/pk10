/**
 * Created by carter on 8/23/2018.
 */
import React,{Component} from 'react';
import * as PIXI from 'pixi.js';
import Racing from './Racing'
import ATimer from '../../component/ATimer'
import {TweenMax,TweenLite, Sine, Linear} from "gsap";
export default class Game extends Component {
    constructor(props) {
        super(props);
        this.dtime ='';
        this.isMute = false;
        this.timer = new ATimer();
        let strTime = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate() + " " + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();
        this.state = {
            drawNo:'123456',
            countDownTime:'00:00',
            idResult:'12345678910',
            lbResult:'DrawNo',
            dateTime:this.updateDateTime(strTime),
            total:'0',
            bigSmall:'B',
            oddEven:'O',
            d1:'D',
            d2:'D',
            d3:'D',
            d4:'D',
            d5:'D'
        }
    }

    componentDidMount() {
        PIXI.loader
            .add('loading1', '../img/mcWheel.json')
            .add('loading2', '../img/blur.json')
            .add('loading3', '../img/body.json')
            .add('loading4', '../img/light.json')
            .add('loading5', '../img/num.json')
            .add('loading6', '../img/CarRes.json')
            .add('loading7', '../img/iconSound.json')
            .load(this.init.bind(this));
    }

    init() {
        this.app = new PIXI.Application(830, 450, {backgroundColor: 'transparent', transparent:true});
        this.refs.canvasContainer.appendChild(this.app.view);
        this.stage = new PIXI.Container();

        this.mcRacing = new Racing();
        this.mcRacing.init();
        this.mcOderHolder = new PIXI.Container();
        this.mcOderHolder.x = 180;
        this.mcOderHolder.y = 8;

        let graphic = new PIXI.Graphics();
        graphic.lineStyle(2, 0xdb2222, 1);
        graphic.beginFill(0xdb2222, 1);
        graphic.drawRect(0, 0, 830, 45);

        graphic.beginFill(0x9B0D0D, 1);
        graphic.drawRoundedRect(590, 5, 230, 38, 8,8,8,8);

        graphic.lineStyle(2, 0xffffff, 1);
        graphic.beginFill(0xffffff, 1);
        graphic.drawRect(0, 387, 830, 50);

        graphic.lineStyle(2, 0xdb2222, 1);
        graphic.beginFill(0xdb2222, 1);
        graphic.drawRoundedRect(107, 393, 39, 38, 4,4,4,4);

        graphic.lineStyle(2, 0xdb2222, 1);
        graphic.beginFill(0xdb2222, 1);
        graphic.drawRoundedRect(163, 393, 39, 38, 4,4,4,4);

        graphic.lineStyle(2, 0xdb2222, 1);
        graphic.beginFill(0xdb2222, 1);
        graphic.drawRoundedRect(222, 393, 39, 38, 4,4,4,4);

        graphic.lineStyle(2, 0xdb2222, 1);
        graphic.beginFill(0xdb2222, 1);
        graphic.drawRoundedRect(471, 393, 39, 38, 4,4,4,4);

        graphic.lineStyle(2, 0xdb2222, 1);
        graphic.beginFill(0xdb2222, 1);
        graphic.drawRoundedRect(527, 393, 39, 38, 4,4,4,4);

        graphic.lineStyle(2, 0xdb2222, 1);
        graphic.beginFill(0xdb2222, 1);
        graphic.drawRoundedRect(583, 393, 39, 38, 4,4,4,4);

        graphic.lineStyle(2, 0xdb2222, 1);
        graphic.beginFill(0xdb2222, 1);
        graphic.drawRoundedRect(639, 393, 39, 38, 4,4,4,4);

        graphic.lineStyle(2, 0xdb2222, 1);
        graphic.beginFill(0xdb2222, 1);
        graphic.drawRoundedRect(695, 393, 39, 38, 4,4,4,4);

        let frames = [];
        for (let i = 0; i < 2; i++) {
            frames.push(PIXI.Texture.fromFrame('mcMute000' + i));
        }
        this.mcMute = new PIXI.extras.AnimatedSprite(frames);
        this.mcMute.interactive = true;
        this.mcMute.buttonMode = true;
        this.mcMute.on('mousedown', this.hdlSound.bind(this));

        this.mcMute.x = 780;
        this.mcMute.y = 393;

        this.stage.addChild(this.mcRacing);
        this.stage.addChild(graphic);
        this.stage.addChild(this.mcOderHolder);
        this.stage.addChild(this.mcMute);

        let iconTime = PIXI.Sprite.fromImage('../img/clock.png');

        iconTime.scale.set(0.13);
        this.stage.addChild(iconTime);
        iconTime.x = 710;
        iconTime.y = 13;
        this.app.stage.addChild(this.stage);
        this.initOrder();
        this.startCountdown('123456789', 152);
        setTimeout(this.startGame.bind(this), 3000, this.mcRacing.getResult(), "123456")
        this.animate.bind(this);
    }

    hdlSound(){
        this.isMute = !this.isMute;
        this.mcMute.gotoAndStop(this.isMute ? 1 : 0)
        this.mcRacing.setMute(this.isMute);
    }

    initOrder() {
        let mc;
        this.arrOrder = [];
        this.arrOrderPos = [];
        for (let i = 0; i < 10; i++) {
            mc = PIXI.Sprite.fromFrame('mcBg000'+i);
            this.arrOrder.push(mc);
            mc.x = i * 40;
            this.arrOrderPos.push(mc.x);
            this.mcOderHolder.addChild(mc);
        }
    }

    updateDateTime(strData)
    {
        var arr = strData.split(" ");
        var arrTime = arr[1].split(":");
        var arrDate = arr[0].split("-");
        var sd = new Date(arrDate[0], arrDate[1], arrDate[2], arrTime[0], arrTime[1], arrTime[2]);
        var ld = new Date();
        this.dtime = sd.getTime() - ld.getTime();

        this.intervalTime = setInterval(this.onEnterFrameHandler.bind(this),33);
    }

    onEnterFrameHandler()
    {
        var ld = new Date();
        var sd = new Date();
        sd.setTime(ld.getTime() + this.dtime);

        var strDate = sd.getFullYear() + "/" + this.formatString(sd.getMonth()) + "/" + this.formatString(sd.getDate());
        var strTime = this.formatString(sd.getHours()) + ":" + this.formatString(sd.getMinutes()) + ":" + this.formatString(sd.getSeconds());
        this.setState({
            dateTime: strDate+" "+strTime
        })
    }

    formatString(n) {
        let res = "0" + n.toString();
        return res.substring(res.length - 2, res.length);
    }

    reset() {
        this.mcOderHolder.visible = false;
        $('#resultInfo').css('z-index',0);
        $('#statInfo p').css('visibility','hidden');
    }

    resetRace(e) {
        this.reset();
    }

    formatTime(t) {
        let minutes = Math.floor(t / 60);
        let seconds = t % 60;
        return (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
    }

    stopCountdown() {
        if (this.isCounting) {
            this.isCounting = false;
            this.setState({countDownTime:'00:00'});
        }
    }

    startGame(arr, draw) {
        if (this.isStarted) {
            return;
        }
        this.mcOderHolder.visible = true;
        $('#resultInfo').css('z-index',3);
        $('#statInfo p').css('visibility','visible');
        this.isStarted = true;
        this.mcRacing.startGame(10, arr);
        this.mcRacing.on("END_RACE", this.onEndRace.bind(this));
        this.mcRacing.on("FINISH", this.onFinishRace.bind(this));
        this.intervalId = setInterval(this.updateOrder.bind(this), 100);
    }

    onFinishRace(e)
    {
        this.mcRacing.off("FINISH", this.onEndRace.bind(this));
        this.isStarted = false;
        if (this.isCounting) {
            this.mcRacing.resetGame();
            this.reset();
        }
    }

    onEndRace(e) {
        this.mcRacing.off("END_RACE", this.onEndRace.bind(this));
        // this.dispatchEvent(new Event("END_RACE"));
        clearInterval(this.intervalId);
        this.updateOrder.bind(this);

    }

    startCountdown(drawNo, time) {
        this.drawNo = drawNo;
        this.time = time;
        this.timer.startTimer(time, this.onATimerHandler.bind(this));
        this.isCounting = true;

        if (this.mcRacing.resetGame()) {
            this.resetRace(null);
        } else {
            this.mcRacing.on("RESET", this.resetRace.bind(this));
        }
    }

    onATimerHandler(t) {
        if (t < 0) {
            this.stopCountdown();
            return;
        }
        this.setState({
            countDownTime:this.formatTime(t)
        });
    }

    updateOrder() {
        let arr = this.mcRacing.getRate();
        this.total = 0;
        let rate = 0;
        this.grades = [];
        for (let i = 0; i < this.arrOrder.length; i++) {
            rate = arr[i].id + 1;
            this.grades[arr[i].id] = i;
            if (i < 3) {
                this.total += rate;
            }
            TweenLite.to(this.arrOrder[arr[i].id], 0.1, {x: this.arrOrderPos[i], ease: Sine.easeInOut});
        }
        this.setState({
            total:this.total,
            bigSmall: this.total > 16 ? 'B':'S',
            oddEven: this.total % 2 ? 'E':'O',
            d1:this.grades[0] > this.grades[9]?'T':'D',
            d2:this.grades[1] > this.grades[8]?'T':'D',
            d3:this.grades[2] > this.grades[7]?'T':'D',
            d4:this.grades[3] > this.grades[6]?'T':'D',
            d5:this.grades[4] > this.grades[5]?'T':'D'
        });
    }

    animate() {
        this.frame = requestAnimationFrame(this.animate);
        this.app.renderer.render(this.stage);
    }

    render() {
        return (
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
                <div className="stat" id="statInfo">
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
