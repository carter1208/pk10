/**
 * Created by carter on 9/10/2018.
 */
import * as PIXI from 'pixi.js';
import {TweenMax,TweenLite, Sine, Linear} from "gsap";
import DisplayUtil from '../util/DisplayUtil'

export default class Result extends PIXI.Container{
    constructor(props){
        super();
        this.isReady = false;
        this.speed = .3;
        this.bg = PIXI.Sprite.fromImage('./img/bgRes.png');
        this.prize1 = PIXI.Sprite.fromImage('./img/mcPrize1.png');
        this.prize2 = PIXI.Sprite.fromImage('./img/mcPrize2.png');
        this.prize3 = PIXI.Sprite.fromImage('./img/mcPrize3.png');
        this.prize1.x = 400;
        this.prize1.y = 40;
        this.prize2.x = 150;
        this.prize2.y = 90;
        this.prize3.x = 700;
        this.prize3.y = 90;
        this.addChild(this.bg);
        this.addChild(this.prize1);
        this.addChild(this.prize2);
        this.addChild(this.prize3);
    }

    init(grade){
        this.firstCar = PIXI.Sprite.fromFrame('mcCar1000' + (grade[0] - 1));
        this.secondCar = PIXI.Sprite.fromFrame('mcCar1000' + (grade[1] - 1));
        this.thirdCar = PIXI.Sprite.fromFrame('mcCar1000' + (grade[2] - 1));
        this.firstCar.anchor.x = 1;
        this.secondCar.anchor.x = 1;
        this.thirdCar.anchor.x = 1;
        this.prize1.anchor.x = this.prize2.anchor.x = this.prize3.anchor.x = .5;
        this.firstCar.x = 530;
        this.firstCar.y = 250;
        this.secondCar.y = this.thirdCar.y = 215;
        this.secondCar.x = 250;
        this.thirdCar.x = 800;
        this.addChild(this.firstCar);
        this.addChild(this.secondCar);
        this.addChild(this.thirdCar);
        this.showResult();
        this.isReady = true;
    }

    reset(){
        this.removeChild(this.firstCar);
        this.removeChild(this.secondCar);
        this.removeChild(this.thirdCar);
    }

    setVisible(){
        if(!this.isReady)return;
        this.firstCar = null;
        this.secondCar = null;
        this.thirdCar = null;
        this.prize1.alpha = 0;
        this.prize2.alpha = 0;
        this.prize3.alpha = 0;
    }

    showResult(){
        this.prize1.scale.set(0.9);
        this.prize2.scale.set(0.9);
        this.prize3.scale.set(0.9);

        this.firstCar.scale.set(0.9);
        this.secondCar.scale.set(0.6);
        this.thirdCar.scale.set(0.6);
        this.firstCar.alpha = 0;
        this.secondCar.alpha = 0;
        this.thirdCar.alpha = 0;
        this.prize1.alpha = 0;
        this.prize2.alpha = 0;
        this.prize3.alpha = 0;
        TweenLite.delayedCall(.5, this.tween.bind(this), [this.prize1, 0.92]);
        TweenLite.delayedCall(1.5, this.tween.bind(this), [this.prize2, 0.92]);
        TweenLite.delayedCall(2.5, this.tween.bind(this), [this.prize3, 0.92]);
        TweenLite.delayedCall(.1, this.tween.bind(this), [this.firstCar, 0.95]);
        TweenLite.delayedCall(1.1, this.tween.bind(this), [this.secondCar, 0.7]);
        TweenLite.delayedCall(2.1, this.tween.bind(this), [this.thirdCar, 0.7]);
    }

    tween(obj, val){
        TweenLite.to(obj, this.speed, {alpha:1,  ease:Linear.easeInOut});
        TweenMax.to(obj.scale, .7,{x:val,y:val, repeat:1, yoyo:true});
    }

}
