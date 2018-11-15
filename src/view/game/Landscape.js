/**
 * Created by carter on 9/4/2018.
 */
import * as PIXI from 'pixi.js';
import {TweenLite, Sine} from "gsap/TweenMax";
export default class Background extends PIXI.Container {
    constructor(props) {
        super();
    }

    loadComplete() {
        this.maxspeed = 10;
        this.speed = 3;
        this.dir = 1;
        this.accelerate = 0.05;
        this.mc1 = PIXI.Sprite.fromImage('./img/mcLandscapeLoop.png');
        this.mc2 = PIXI.Sprite.fromImage('./img/mcLandscapeLoop.png');
        this.mcWidth = 876;
        this.mc2.x = 875;
        this.addChild(this.mc1);
        this.addChild(this.mc2);
    }

    startRace(dir = 1) {
        this.dir = dir;
        this.running();
    }

   reset() {
        TweenLite.killTweensOf(this.mc1);
        TweenLite.killTweensOf(this.mc2);
        this.mc1.x = 0;
        this.mc2.x = 875;
    }
    running() {
        this.tween1mc(this.mc1);
        this.tween2mc(this.mc2);
    }

    tween1mc(mc) {
        TweenLite.to(mc, this.speed, {x: -this.dir*this.mcWidth, onComplete: this.onTweenComplete1.bind(this), onCompleteParams:[mc], ease:Linear.easeNone});
    }
    tween2mc(mc) {
        mc.x = this.dir*this.mcWidth;
        TweenLite.to(mc, this.speed, {x: 0, onComplete: this.onTweenComplete2.bind(this), onCompleteParams:[mc], ease:Linear.easeNone});
    }

    onTweenComplete1(mc) {
        mc.x = this.dir*this.mcWidth;
        this.tween2mc(mc);
    }
    onTweenComplete2(mc) {
        if (this.isFinish) {
            return;
        }
        this.tween1mc(mc);
    }

    stopRace() {
        this.isStop = true;
        this.isFinish = true;
    }
}

