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

        this.intervalFrame = setInterval(this.onEnterFrameHandler.bind(this));
    }

    stopTimer()
    {
        clearInterval(this.intervalFrame)
    }

    onEnterFrameHandler()
    {
        var d = new Date();
        this.counter = this.targetTime - Math.floor(d.getTime()/1000);
        if (this.counter >= 0) {
            if (this.handler != null) {
                this.handler.apply(null, [this.counter]);
            }
        } else {
            clearInterval(this.intervalFrame);
            if (this.handler != null) {
                this.handler.apply(null, [this.counter]);
            }
        }
    }
}