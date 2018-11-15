/**
 * Created by carter on 9/7/2018.
 */
import React,{Component} from 'react';
export default class ATimer extends Component{
    constructor(props){
        super();
        this.handler = null;
    }

    startTimer(time = 0, handler = null)
    {
        var d = new Date();
        this.targetTime = Math.floor(d.getTime()/1000) + time;
        this.counter = 0;
        this.handler = handler;
        requestAnimationFrame(this.onEnterFrameHandler.bind(this));
    }

    stopTimer()
    {
        while (this.intervalID > -1)
            cancelAnimationFrame(this.intervalID--);
    }

    onEnterFrameHandler()
    {
        var d = new Date();
        this.counter = this.targetTime - Math.floor(d.getTime()/1000);
        this.intervalID = requestAnimationFrame(this.onEnterFrameHandler.bind(this));
        if (this.counter >= 0) {
            if (this.handler != null) {
                this.handler.apply(null, [this.counter]);
            }
        } else {
            cancelAnimationFrame(this.intervalID);
            if (this.handler != null) {
                this.handler.apply(null, [this.counter]);
            }
            return;
        }
    }
}