/**
 * Created by carter on 9/5/2018.
 */
import * as PIXI from 'pixi.js';
import {TweenLite, Sine} from "gsap/TweenMax";

export default class OrderCar extends PIXI.Container {
    constructor(props) {
        super();
    }

    init(){
        this.arrOrder = [];
        for (let i = 0; i < 10; i++){
            let mcOrder = PIXI.Sprite.fromFrame('mcBg000'+i);
            mcOrder.x = i *42;
            this.addChild(mcOrder);
            this.arrOrder.push(mcOrder);
        }
    }
}
