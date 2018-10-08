
/**
 * Created by carter on 9/4/2018.
 */
import * as PIXI from 'pixi.js';
import {TweenLite, Sine} from "gsap/TweenMax";
export default class Stadium extends PIXI.Container {
    constructor(props) {
        super();
    }

    loadComplete() {
        this.speed = 1;
        this.mcWidth = 900;
        this.dir = 1;
        this.mcStart = PIXI.Sprite.fromImage('../img/mcStadiumStart.png');
        this.mcFinish = PIXI.Sprite.fromImage('../img/mcStadiumEnd.png');
        this.mc1 = PIXI.Sprite.fromImage('../img/mcStadiumLoop.png');
        this.mc2 = PIXI.Sprite.fromImage('../img/mcStadiumLoop.png');
        this.mcFinish.x = -900;
        this.mc2.x = 1050;
        this.mc1.visible = false;
        this.mc2.visible = false;
        this.addChild(this.mc1);
        this.addChild(this.mcStart);
        this.addChild(this.mc2);
        this.addChild(this.mcFinish);
        this.isStop = false;
        this.isFinish = false;
    }

    startRace(dir = 1) {
        this.dir = dir;
        this.mcFinish.visible = false;
        this.mc1.x = dir * this.mcWidth;
        TweenLite.to(this.mcStart, this.speed, {x: -dir*1280, ease:Linear.easeNone});
        TweenLite.to(this.mc1, this.speed, {x: 0, onComplete: this.running.bind(this), ease:Linear.easeNone});
    }

    reset() {
        this.mc1.x = 0;
        this.mc2.x = 1050;
        this.mcFinish.x =-900;
        this.mcStart.x = -432;
        this.isStop = false;
        this.isFinish = false;
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