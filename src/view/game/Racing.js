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
import Result from './Result';
import {TweenMax,TweenLite, Sine, Linear} from "gsap";
export default class Racing extends PIXI.Container{
    constructor(props) {
        super();
        this.soundUrls = {};
        this.soundPlayer = new Audio();
        this.soundPlayer1 = new Audio();
        this.soundVolume = 1;
        this.soundUrls['cheer'] = 'assets/sound/1_SoundCheer.mp3';
        this.soundUrls['win'] = 'assets/sound/2_SoundWin.mp3';
        this.soundUrls['run'] = 'assets/sound/running.mp3';
        this.soundUrls['start'] = 'assets/sound/4_SoundStart.mp3';
    }

    init(){
        this.mcLandscape = new Landscape();
        this.mcStadium = new Stadium();
        this.mcBg = new Background();
        this.mcResult = new Result();

        this.gate1 = new Gate();
        this.gate2 = PIXI.Sprite.fromImage('../img/gate2.png');

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
        this.arrCar = [];
        this.arrPos = [];
        this.dir = -1;
        for (var i = 0; i < 10; i++){
            var myCar = new Car();
            myCar.init( PIXI.Sprite.fromFrame('mcBody000'+ i), PIXI.Sprite.fromFrame('mcBlur000'+i));
            myCar.scale.set(0.6);
            myCar.x = 667 - ((9 - i)*6.5);
            myCar.y = 145 + (9 - i)*24;
            myCar.width = 97;
            myCar.height = 20;
            this.arrCar.push(myCar);
            this.arrPos.push(myCar.x);
            this.addChild(myCar);
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
    }

    removeChild(){
        this.soundUrls = null;
        this.soundPlayer.volume = 0;
        this.soundPlayer = null;
        this.soundPlayer1.volume = 0;
        this.soundPlayer1 = null;
        this.arrCar = [];
        this.grades = [];
        this.mcBg = null;
        this.gate1 = null;
        this.gate2 = null;
        this.mcLandscape = null;
        this.mcStadium = null;
        this.mcResult = null;
        TweenLite.killTweensOf(this.stopRace.bind(this))
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
            for (let i = 0; i < this.arrCar.length; i++ ) {
                this.arrCar[i].x = this.arrPos[i];
                this.arrCar[i].anim1.stop();
                this.arrCar[i].anim2.stop();
            }
            this.mcBg.reset();
            this.gate1.stop();
            this.mcLandscape.reset();
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
        this.interval = setInterval(this.onCountDown.bind(this), 1000);
        this.mcCountDown.visible = true;
        this.isFinish = false;
        if(this.soundPlayer) {
            this.soundPlayer.src = this.soundUrls['start'];
            this.soundPlayer.play();
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
        let px;
        this.mcBg.startRace(this.dir);
        this.mcStadium.startRace(this.dir);
        this.mcLandscape.startRace(this.dir);
        this.arrCar.map((item)=> {
            item.on("THE_FIRST", this.onTheFirst.bind(this));
            item.on("THE_LAST", this.onTheLast.bind(this));
            item.on("FINISH", this.onFinishRace.bind(this));
            px = (this.dir == 1) ? 400 + Math.random() * 300 : 600 - Math.random() * 300;
            item.anim1.play();
            item.anim2.play();
            TweenLite.to(item, 3, {x: px, onComplete: this.onTweenComplete.bind(this), onCompleteParams:[item], ease: Sine.easeInOut});
        });
        TweenLite.delayedCall(this.time, this.stopRace.bind(this));
    }

    onTweenComplete(mcCar) {
        mcCar.startRace(this.dir);
    }

    getResult() {
        var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        var res = [];
        while (arr.length > 0) {
            var idx = Math.floor(Math.random() * arr.length);
            var temp = arr[idx];
            arr[idx] = arr[0];
            arr[0] = temp;
            res.push(arr.shift());
        }
        return res;
    }

    onFinishRace(e) {
        console.log('onFinishRace...')
        if (this.isClose) {
            return;
        }
        this.showResult();
    }

    showResult() {
        if (this.isClose)
            return;
        if(this.soundPlayer1) {
            this.soundPlayer1.src = this.soundUrls['win'];
            this.soundPlayer1.play();
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
            this.soundPlayer1.play();
        }
    }

    onTheLast(e) {
        console.log('onTheLast...')
        if(this.isClose)
            return;
        this.emit("END_RACE")
    }

    stopRace(){
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
        arrx.sort((a,b)=> a.x > b.x);
        return arrx;
    }
}
