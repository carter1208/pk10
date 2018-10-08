/**
 * Created by carter on 8/23/2018.
 */
import * as PIXI from 'pixi.js';
import {TweenLite, Sine} from "gsap/TweenMax";
import Player from './Player'

export default class Car extends Player{
    constructor(props){
        super();
    }

    init(body, blur){
        super.init();
        let frames = [];
        for (let i = 59; i > 0; i--) {
            let val = i < 10 ? '0' + i : i;
            frames.push(PIXI.Texture.fromFrame('mcWheel200' + val));
        }
        this.anim1 = new PIXI.extras.AnimatedSprite(frames);
        this.anim2 = new PIXI.extras.AnimatedSprite(frames);

        this.anim1.x = 47;
        this.anim1.y = 32;
        this.anim2.x = 195;
        this.anim2.y = 28;
        this.mcBody = body;
        this.mcBlur = blur;
        this.mcBlur.visible = false;
        this.addChild(this.mcBody);
        this.addChild(this.mcBlur);
        this.addChild(this.anim1);
        this.addChild(this.anim2);
    }

    startRace(dir = 1)
    {
        this.anim1.play();
        this.anim2.play();
        super.startRace(dir);
    }

    increaseSpeed(t)
    {
        this.mcBlur.visible = true;
        TweenLite.to(this.mcBlur, 0.5, {alpha:.3});
        TweenLite.to(this.mcBlur, 0.5, {alpha:0, delay:t});
    }
}