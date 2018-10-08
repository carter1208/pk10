/**
 * Created by carter on 8/24/2018.
 */
import * as PIXI from 'pixi.js';
import {TweenLite, Sine} from "gsap/TweenMax";
export default class Player extends PIXI.Container{
    constructor(props){
        super();
    }
    init(){
        this.dir = 1;
        this.speed = 0;
        this.maxx = 550;
        this.minx = 200;
        this.isFinish = false;
        this.isFirst = false;
        this.isLast = false;
    }
    startRace(dir = 1){
        this.dir = dir;
        this.isFinish = false;
        let rand = Math.random();
        if (rand > 0.5) {
            this.speed = 1;
        } else {
            this.speed = -1;
        }
        this.changeSpeed();
    }

    stopRace(rank) {
        this.isFirst = (rank == 0 ?  true : false);
        this.isLast = (rank == 9 ? true : false);
        let px = 0;
        let dif = 0;

        if ( this.dir > 0) {
            px = 830 - rank * 50;
        } else {
            px = 200 + rank * 50;
        }
        dif =  px - this.x;
        if ( dif *  this.dir > 0) {
            this.increaseSpeed(2);
        }
        let t = 2;
        this.isFinish = true;
        this.running(t, px);
    }

    finishRace() {
        if (this.isFirst) {
            this.emit("THE_FIRST");
        }
        if (this.isLast) {
            this.emit("THE_LAST");
        }
        let px = this.x + 830 * this.dir;
        TweenLite.to(this, 1.5, {x: px, onComplete: this.onFinishRace.bind(this)});
    }

    onFinishRace() {
        if (this.isLast) {
            this.emit("FINISH");
        }
    }

    changeSpeed() {
        let len = this.maxx - this.minx;
        let px = this.minx + Math.random() * len;
        let dif = px - this.x;
        let t = 0;
        if (Math.abs(dif) < 50) {
            px = this.x;
            t = 2;
        } else {
            if (this.dir > 0) {
                t = (Math.abs(dif) / this.maxx) * 10  + (dif > 0 ? 0 : (Math.abs(dif) / this.maxx) * 10);
            } else {
                t = (Math.abs(dif) / this.maxx) * 10  + (dif < 0 ? 0 : (Math.abs(dif) / this.maxx) * 10);
            }
        }
        if (dif * this.dir > 0) {
            this.increaseSpeed(t);
        }
        this.running(t, px);
    }

    running(t, px) {
        TweenLite.killTweensOf(this);
        if (px < -1000) {
            px = -1000;
        }
        if (px > 1000 + this.maxx) {
            px = 1000 + this.maxx;
        }
        TweenLite.to(this, t, {x: px, onComplete:this.onTweenComplete.bind(this), ease:this.isFinish ? Sine.easeIn : Sine.easeInOut});
    }

    increaseSpeed(t) {

    }

    onTweenComplete() {
        if (this.isFinish) {
            this.finishRace();
        } else {
            this.changeSpeed();
        }
    }
}

