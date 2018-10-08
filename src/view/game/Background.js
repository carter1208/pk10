/**
 * Created by carter on 8/24/2018.
 */
import * as PIXI from 'pixi.js';
import {TweenLite, Sine} from "gsap/TweenMax";
export default class Background extends PIXI.Container{
    constructor(props){
        super();
    }
    loadComplete(){
        this.speed = 1;
        this.mcWidth = 900;
        this.dir = 1;
        this.mcStart = PIXI.Sprite.fromImage('../img/mcBgStart.png');
        this.mcFinish = PIXI.Sprite.fromImage('../img/mcFinish.png');
        this.mc1 = PIXI.Sprite.fromImage('../img/mc1.png');
        this.mc2 = PIXI.Sprite.fromImage('../img/mc2.png');
        this.mcFinish.x = -900;

        this.mc1.x = 100;
        this.mc2.x = 900;
        this.addChild(this.mc1);
        this.addChild(this.mcStart);
        this.addChild(this.mc2);
        this.addChild(this.mcFinish);
        this.isStop = false;
        this.isFinish = false;
    }
    init(mcGate1, mcGate2) {
        this.mcGate1 = mcGate1;
        this.mcGate2 = mcGate2;
        this.mcGate2.visible = false;
    }

    reset() {
        this.mcGate1.visible = true;
        this.mcGate2.visible = false;
        this.mcFinish.visible = false;
        this.mcStart.x = 0;
        this.mcGate1.x = 578;
        this.mcGate2.x = -900;
        this.isStop = false;
        this.isFinish = false;
    }

    startRace(dir = 1) {
        this.dir = dir;
        this.mcFinish.visible = false;
        this.mc1.x = dir * this.mcWidth;
        TweenLite.to(this.mcStart, this.speed, {x: -dir*this.mcWidth, ease:Linear.easeNone});
        TweenLite.to(this.mcGate1, this.speed/2, {x: -dir*this.mcWidth, ease:Linear.easeNone});
        TweenLite.to(this.mc1, this.speed, {x: 0, onComplete: this.running.bind(this), ease:Linear.easeNone});
    }

    running() {
        this.tweenmc1(this.mc1);
        this.tweenmc2(this.mc2);
    }

    tweenmc1(mc) {
        TweenLite.to(mc, this.speed, {x: -this.dir*this.mcWidth, onComplete: this.onTweenComplete1.bind(this), onCompleteParams:[mc], ease:Linear.easeNone});
    }
    tweenmc2(mc) {
        mc.x = this.dir*this.mcWidth;
        TweenLite.to(mc, this.speed, {x: 0, onComplete: this.onTweenComplete2.bind(this), onCompleteParams:[mc], ease:Linear.easeNone});

        if (this.isStop) {
            this.isStop = false;
            this.isFinish = true;
            this.mcFinish.visible = true;
            this.mcFinish.x = (this.dir == 1) ? mc.x + mc.width : mc.x - this.mcFinish.width;
            this.speed = 1;
            this.mcGate2.visible = true;
            TweenLite.to(this.mcGate2, this.speed, {x: 225, onComplete: this.onTweenComplete2.bind(this), onCompleteParams:[this.mcFinish], ease:Linear.easeNone});
            TweenLite.to(this.mcFinish, this.speed, {x: 0, onComplete: this.onTweenComplete2.bind(this), onCompleteParams:[this.mcFinish], ease:Linear.easeNone});
        }
    }

    onTweenComplete1(mc) {
        if (this.isFinish) {
            return;
        }
        mc.x = this.dir*this.mcWidth;
        this.tweenmc2(mc);
    }

    onTweenComplete2(mc) {
        if (this.isFinish && (mc == this.mcFinish)) {
            return;
        }
        this.tweenmc1(mc);
    }

    stopRace() {
        this.isStop = true;
        this.isFinish = false;
    }
}