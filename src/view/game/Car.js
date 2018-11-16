/**
 * Created by carter on 8/23/2018.
 */
import * as PIXI from 'pixi.js';
import {TweenMax, TweenLite, Sine, Linear} from "gsap/TweenMax";
import Player from './Player'

export default class Car extends Player{
    constructor(props){
        super();
        this.stage = new PIXI.Container();
        this.addChild(this.stage);
    }

    init(body, blur){
        super.init();
        this.wheel1 = PIXI.Sprite.fromImage('./img/wheel.png');
        this.wheel2 = PIXI.Sprite.fromImage('./img/wheel.png');
        this.wheel1.anchor.set(.5,.5)
        this.wheel2.anchor.set(.5,.5)
        this.wheel1.x = 65;
        this.wheel1.y = 48;
        this.wheel2.x = 214;
        this.wheel2.y = 46;
        this.mcBody = body;
        this.mcBlur = blur;
        this.mcBlur.visible = false;
        this.stage.addChild(this.mcBody);
        this.stage.addChild(this.mcBlur);
        this.stage.addChild(this.wheel1);
        this.stage.addChild(this.wheel2);
        this.tween1 = new TweenMax(this.wheel1, 40, {rotation:-18, ease:Linear.easeNone, repeat:-1, useFrames:true});
        this.tween2 = new TweenMax(this.wheel2, 40, {rotation:-18, ease:Linear.easeNone, repeat:-1, useFrames:true});
    }

    reset(){
        this.tween1.kill();
        this.tween2.kill();
    }

    startRace(dir = 1)
    {
        this.tween1.play();
        this.tween2.play();
        this.resetSpeed();
        super.startRace(dir);
    }

    stop(){
        this.tween1.pause();
        this.tween2.pause();
    }

    resetSpeed(){
        this.tween1.duration(40);
        this.tween2.duration(40);
    }

    increaseSpeed(t)
    {
        this.mcBlur.visible = true;
        this.tween1.duration(24);
        this.tween2.duration(24);
        TweenLite.to(this.mcBlur, 0.5, {alpha:.3});
        TweenLite.to(this.mcBlur, 0.5, {alpha:0, delay:t});
    }
}