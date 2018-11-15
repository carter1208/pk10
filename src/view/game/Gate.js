/**
 * Created by carter on 9/4/2018.
 */
import * as PIXI from 'pixi.js';
import {TweenLite, Sine} from "gsap/TweenMax";

export default class  Gate extends PIXI.Container {
    constructor(props) {
        super();
    }

    init() {
        let frames = [];
        for (let i = 0; i < 100; i++) {
            let val = i < 10 ? '0' + i : i;
            frames.push(PIXI.Texture.fromFrame('mcLight100' + val));
        }
        this.gate = PIXI.Sprite.fromImage('./img/gate1.png');
        this.anim1 = new PIXI.extras.AnimatedSprite(frames);
        this.anim2 = new PIXI.extras.AnimatedSprite(frames);
        this.anim1.x = 92.85;
        this.anim1.y = 3;
        this.anim2.x = 33;
        this.anim2.y = 228;
        this.addChild(this.gate);
        this.addChild(this.anim1);
        this.addChild(this.anim2);
    }
    start(){
        this.anim1.play();
        this.anim2.play();

        this.anim1.animationSpeed = 0.75;
        this.anim2.animationSpeed = 0.75;
    }
    stop(){
        this.anim1.stop();
        this.anim1.gotoAndStop(0);
        this.anim2.gotoAndStop(0);
        this.anim2.stop();
    }
}
