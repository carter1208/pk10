/**
 * Created by carter on 8/23/2018.
 */
import React,{Component} from 'react';
import * as PIXI from 'pixi.js';
import Racing from './Racing';
import Command from '../../constant/Command'
import ATimer from '../../component/ATimer';
import GameUtil from '../util/GameUtil';
import {TweenMax,TweenLite, Sine, Linear} from "gsap";
import {T} from '../../model/language/Translator';
import {model} from '../../model/Model';

export default class Game extends Component {
    constructor(props) {
        super(props);
        this.dtime ='';
        this.total = 0;
        this.grades = [];
        this.mcRacing = null;
        this.isMute = false;
        this.isStarted = false;
        this.isCounting = false;
        this.timer = new ATimer();
        this.state = {
            isShow:true,
            drawNo:'123456',
            countDownTime:'00:00',
            idResult:'12345678910',
            lbResult:'DrawNo',
            dateTime:'00:00:00',
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

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    componentDidMount() {
        model.subscribe(Command.SERVER_DATE, this);
        model.subscribe(Command.START_BET_LOBBY, this);
        model.subscribe(Command.STOP_BET_LOBBY, this);
        model.subscribe(Command.TABLE_START, this);
        model.subscribe(Command.BET_RESULT, this);

        this.app = new PIXI.Application(830, 440, {backgroundColor: 'transparent', transparent:true});
        this.refs.canvasContainer.appendChild(this.app.view);
        this.init();
    }

    componentWillUnmount() {
        this.mounted = false;

        model.unsubscribe(Command.SERVER_DATE, this);
        model.unsubscribe(Command.START_BET_LOBBY, this);
        model.unsubscribe(Command.STOP_BET_LOBBY, this);
        model.unsubscribe(Command.TABLE_START, this);
        model.unsubscribe(Command.BET_RESULT, this);
        this.mcRacing.removeChild();
        this.mcRacing.removeAllListeners();
        this.timer.stopTimer();
        cancelAnimationFrame(this.intervalTime);
        clearInterval(this.intervalId);
        clearTimeout(this.callTimeout)
        clearInterval(this.call);

        this.stage.destroy();
        this.isStarted = false;
        this.app.renderer.destroy();
        this.app = null;
        delete this.stage;
        delete this.app;
        // PIXI.loader.reset();
        // PIXI.utils.clearTextureCache();
    }


    init() {
        this.stage = new PIXI.Container();

        this.mcRacing = new Racing();
        this.mcRacing.init();
        this.mcRacing.height = 400;

        this.mcRacing.on("END_RACE", this.onEndRace.bind(this));
        this.mcRacing.on("FINISH", this.onFinishRace.bind(this));

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

        let iconTime = PIXI.Sprite.fromImage('./img/clock.png');

        iconTime.scale.set(0.13);
        this.stage.addChild(iconTime);
        iconTime.x = 710;
        iconTime.y = 13;
        this.app.stage.addChild(this.stage);
        this.initOrder();
        this.startCountdown('123456789', 152);

        this.animate.bind(this);

        model.clientReady = true;
        // this.callTimeout = setTimeout(this.startGame.bind(this), 4000, this.getResult(), "123456")
        // this.call = setInterval(this.testRacing.bind(this), 15000);
    }

    testRacing(){
        this.startGame(this.getResult(), "123456");
    }

    getResult() {
        var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        arr.sort(function(a, b){return 0.5 - Math.random()});
        return arr;
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

        requestAnimationFrame(() => this.onEnterFrameHandler());
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
        this.intervalTime = requestAnimationFrame(this.onEnterFrameHandler.bind(this));
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
            clearInterval(this.call);
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
        if(this.app) {
            this.mcRacing.startGame(10, arr);
        }
        this.intervalId = setInterval(() => this.updateOrder(), 100);
    }

    onFinishRace(e)
    {
        if(!this.app) {
            return;
        }
        this.mcRacing.off("FINISH", this.onEndRace.bind(this));
        this.isStarted = false;
        if (this.isCounting) {
            this.mcRacing.resetGame();
            this.reset();
        }
    }

    onEndRace(e) {
        this.mcRacing.off("END_RACE", this.onEndRace.bind(this));
        clearInterval(this.intervalId);
        this.updateOrder();
    }

    startCountdown(drawNo, time) {
        this.drawNo = drawNo;
        this.time = time;
        this.timer.startTimer(time, (t) => this.onATimerHandler(t));
        this.isCounting = true;
        if(!this.mcRacing)return;
        this.mcRacing.off("RESET", this.resetRace.bind(this));
        if (this.mcRacing.resetGame()) {
            this.resetRace(null);
        } else {
            this.mcRacing.on("RESET", this.resetRace.bind(this));
        }
    }

    onATimerHandler(t) {
        if(t > 0 && t % 25 == 0){
            this.testRacing();
        }
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
        if(arr.length < 1) return;
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
        // this.intervalId = requestAnimationFrame(() => this.updateOrder());
    }

    animate() {
        this.frame = requestAnimationFrame(this.animate);
        this.app.renderer.render(this.stage);
    }

    removeState(){
        this.setState({isShow:false});
    }

    update(command, data) {
        if(!data) return;
        switch (command) {
            case Command.SERVER_DATE:
                this.updateDateTime(data);
                break;
            case Command.TABLE_START:
                if(data.tbId != model.tableId)return;
                // this.startCountdown(data.drawNo, data.countDown);
                break;
            case Command.START_BET_LOBBY:
                if(data.tbId != model.tableId)return;
                // this.startCountdown(data.drawNo, data.countDown);
                break;
            case Command.STOP_BET_LOBBY:
                // this.stopCountdown(data.drawNo, data.countDown);
                break;
            case Command.BET_RESULT:
                if(data.tableId != model.tableId)return;
                // this.startGame(data.numbers, data.drawNo);
                break;
        }
    }

    render() {
        if(!this.state.isShow){
            return <div></div>
        }
        return (
            <div className="game" ref="Container" id="Container">
                <div className="game-canvas-container" ref="canvasContainer"/>
                <div className="dateTime">
                    <div className="drawNo">
                        <div className="lbCurrDraw">
                            {T.translate('lblDrawNo')}
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
                        {T.translate('lblResultDrawNo')}  {this.state.idResult}
                    </div>
                    <div className="time">
                        {this.state.dateTime}
                    </div>
                </div>
                <div className="stat" id="statInfo">
                    <div className="total">
                        <span>{T.translate('lblTop3')}</span>
                        <p className="total">{this.state.total}</p>
                        <p className="bs">{this.state.bigSmall}</p>
                        <p className="ov">{this.state.oddEven}</p>
                    </div>
                    <div className="dt">
                        <span>{T.translate('lblDT')}</span>
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
