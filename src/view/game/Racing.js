/**
 * Created by carter on 8/23/2018.
 */
import React,{Component} from 'react';
import * as PIXI from 'pixi.js';
import Car from './Car';
import Background from './Background';
import Stadium from './Stadium';
import Landscape from './Landscape';
import Gate from './Gate';
import GameUtil from '../util/GameUtil';
import Result from './Result';
import {TweenMax, TweenLite, Sine, Linear} from "gsap";
export default class Racing extends PIXI.Container{
    constructor(props) {
        super();
        this.grades = []
        this.soundUrls = {};
        this.soundPlayer = new Audio();
        this.soundPlayer1 = new Audio();
        this.soundVolume = 1;
        this.soundUrls['cheer'] = 'assets/sound/1_SoundCheer.mp3';
        this.soundUrls['win'] = 'assets/sound/2_SoundWin.mp3';
        this.soundUrls['run'] = 'assets/sound/running.mp3';
        this.soundUrls['start'] = 'assets/sound/4_SoundStart.mp3';

        this.stage = new PIXI.Container();

    }

    init(){
        this.mcLandscape = new Landscape();
        this.mcStadium = new Stadium();
        this.mcBg = new Background();
        this.mcResult = new Result();

        this.gate1 = new Gate();
        this.gate2 = PIXI.Sprite.fromImage('./img/gate2.png');

        this.gate1.init();
        this.gate1.x = 580;
        this.gate1.y = 45;

        this.gate2.x = -900;
        this.gate2.y = 62;

        this.mcLandscape.loadComplete();
        this.mcStadium.loadComplete();
        this.mcBg.loadComplete();
        this.mcBg.init(this.gate1, this.gate2);
        this.mcStadium.y = -20;
        this.mcBg.y = 120;

        this.addChild(this.mcLandscape);
        this.addChild(this.mcStadium);
        this.addChild(this.mcBg);
        this.addChild(this.stage);
        this.arrCar = [];
        this.arrPos = [];
        this.dir = -1;
        for (let i = 0; i < 10; i++){
            let myCar = new Car();
            myCar.init( PIXI.Sprite.fromFrame('mcBody000'+ i), PIXI.Sprite.fromFrame('mcBlur000'+i));
            myCar.scale.set(0.6);
            myCar.x = 667 - ((9 - i)*6.5);
            myCar.y = 143 + (9 - i)*24;
            myCar.width = 97;
            myCar.height = 20;
            this.arrCar.push(myCar);
            this.arrPos.push(myCar.x);
            this.stage.addChild(myCar);
        }
        this.mcCountDown = new PIXI.Text('', {fontFamily : 'Haettenschweiler', fontSize: 80, fill : 0xffffff, align : 'center'});

        this.addChild(this.mcCountDown);
        this.mcCountDown.x = 384;
        this.mcCountDown.y = 200;
        this.addChild(this.gate1);
        this.addChild(this.gate2);
        this.addChild(this.mcResult);

        let graphic = new PIXI.Graphics();
        graphic.lineStyle(2, 0xFF00FF, 1);
        graphic.beginFill(0xFF00BB, 0.25);
        graphic.drawRoundedRect(0, 0, 830, 800);
        graphic.endFill();
        this.addChild(graphic);
        this.mask = graphic;

        this.isFinish  = true;
        this.isReset  = false;
        this.isClose  = false;
        this.mcResult.visible  = false;
        this.arrCar.map((item)=> {
            item.on("THE_FIRST", () => this.onTheFirst());
            item.on("THE_LAST", () => this.onTheLast());
            item.on("FINISH", () => this.onFinishRace());
        });
    }

    removeChild(){
        this.soundPlayer.pause();
        this.soundPlayer1.pause();
        delete this.soundPlayer;
        delete this.soundPlayer1;
        this.arrCar.map((item)=> {
            item.off("THE_FIRST", () => this.onTheFirst());
            item.off("THE_LAST", () => this.onTheLast());
            item.off("FINISH", () => this.onFinishRace());
            item.removeAllListeners()
        });

        delete this.stage;
        TweenLite.killDelayedCallsTo(this.stopRace());
        clearInterval(this.interval);
    }

    setMute(val) {
        this.soundVolume = val ? 0 : 1;
        this.soundPlayer.volume = this.soundVolume;
        this.soundPlayer1.volume = this.soundVolume;
    }

    resetGame() {
        if (this.isFinish) {
            this.mcResult.visible  = false;
            this.isReset = false;
            this.mcCountDown.text = '';
            this.arrCar.map ((obj, i) => {
                obj.x = this.arrPos[i];
                obj.stop();
            });
            this.mcBg.reset();
            this.gate1.stop();
            this.mcLandscape.reset();
            this.mcResult.reset();
            this.mcResult.setVisible();
            this.mcStadium.reset();
            return true;
        } else {
            this.isReset = true;
            return false;
        }
    }

    startGame(time, grades) {
        console.log('startGame...')
        this.time = time;
        this.grades = grades;
        this.countDown = 3;
        this.interval = setInterval(() => this.onCountDown(), 1000);
        this.mcCountDown.visible = true;
        this.isFinish = false;
        if(this.soundPlayer) {
            this.soundPlayer.src = this.soundUrls['start'];
            this.soundPlayer.play()
        }
    }

    onCountDown(){
        if(this.countDown == 2) {
            this.gate1.start();
        }
        if(this.countDown == 0){
            this.onStart();
            this.countDown = 0;
            this.mcCountDown.visible = false;
            clearInterval(this.interval);
            return;
        }
        this.mcCountDown.text = this.countDown;
        this.countDown--;
    }

    onStart(){
        this.startRace();
    }

    startRace() {
        if (this.isClose)
            return;
        if(this.soundPlayer) {
            this.soundPlayer.src = this.soundUrls['run'];
            this.soundPlayer.play();
        }
        let px = 0;
        this.mcBg.startRace(this.dir);
        this.mcStadium.startRace(this.dir);
        this.mcLandscape.startRace(this.dir);
        this.arrCar.map((item)=> {
            px = (this.dir == 1) ? 400 + Math.random() * 300 : 600 - Math.random() * 300;
            item.startRace();
            TweenLite.to(item, 3, {x: px, onComplete: this.onTweenComplete.bind(this), onCompleteParams:[item], ease: Sine.easeInOut});
        });
        TweenLite.delayedCall(this.time, () => this.stopRace());
    }

    onTweenComplete(mcCar) {
        mcCar.startRace(this.dir);
    }

    onFinishRace(e) {
        console.log('onFinishRace...')
        if (this.isClose) {
            return;
        }
        this.showResult();
    }

    showResult() {
        if (this.isClose || !this.mcResult)
            return;
        if(this.soundPlayer1) {
            this.soundPlayer1.src = this.soundUrls['win'];
            var playPromise = this.soundPlayer1.play();
            if (playPromise !== undefined) {
                playPromise.then(_ => {
                    this.soundPlayer1.pause();
                })
                .catch(error => {
                });
            }
        }
        this.mcResult.visible = true;
        this.mcResult.init(this.grades);

        TweenLite.delayedCall(6, ()=> {
            this.isFinish = true;
            this.emit("FINISH");
            if (this.isReset) {
                this.resetGame();
                this.emit("RESET");
            }
        });
    }

    onTheFirst(e) {
        console.log('onTheFirst...')
        if(this.isClose)
            return;
        if(this.soundPlayer1) {
            this.soundPlayer1.src = this.soundUrls['cheer'];
            var playPromise = this.soundPlayer1.play();
            if (playPromise !== undefined) {
                playPromise.then(_ => {
                    this.soundPlayer1.pause();
                })
                    .catch(error => {
                    });
            }
        }
    }

    onTheLast(e) {
        console.log('onTheLast...')
        if(this.isClose)
            return;
        this.emit("END_RACE")
    }

    stopRace(){
        console.log('stopRace......')
        if(this.grades.length < 1) return;
        this.grades.map ((item, idx) => {
            this.arrCar[item-1].stopRace(idx);
        });
        TweenLite.delayedCall(1, this.stopBg.bind(this));
    }

    stopBg(){
        this.mcBg.stopRace();
        this.mcStadium.stopRace();
        this.mcLandscape.stopRace();
    }

    getRate() {
        let arrx = [];
        this.arrCar.map((item, idx) =>{
            arrx.push({id:idx, x:item.x});
        });
        arrx.sort((a,b)=> a.x < b.x ? -1 : (a.x > b.x ? 1 : 0));
        return arrx;
    }
}
