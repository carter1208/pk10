/**
 * Created by carter on 10/26/2018.
 */

import React, {Component, PropTypes} from 'react';
import GameMenuItem from './GameMenuItem'
export default class GameMenu extends Component {
    constructor(props) {
        super(props);
        this.contentH = 0;
        this.py = 0;
        this.isMove = true;
    }

    componentDidMount() {
        this.item = document.getElementsByName('content');
    }

    moveUp(e){
        this.moveList(e.currentTarget, -105);
    }

    moveDown(e){
        this.moveList(e.currentTarget, 105);
    }

    moveList(item, py) {
        if(!this.isMove){
            return;
        }
        this.py += py;
        this.isMove = false;
        if (this.py > 0) {
            this.py = 0;
        } else if (this.py < 310 - this.contentH) {
            this.py = 310 - this.contentH;
        }

        TweenLite.to(this.item, .5, { y:this.py, onComplete:this.onTweenComplete.bind(this)} );
    }

    onTweenComplete(){
        this.isMove = true;
    }

    render() {
        let jsxCol = [];
        this.contentH = 0;
        for (var i = 0; i < 10; i++){
            jsxCol.push(
                <GameMenuItem key={i} id={i + 1}/>
            );
            this.contentH += 105;
        }
        return (
            <div className="game-menu">
                <div className="btnUp" onClick={this.moveUp.bind(this)}>
                    <img src="img/mcUp.png" width='auto' height='auto'/>
                </div>
                <div className="content">
                    <div  ref={div => this.item = div}>
                        {jsxCol}
                    </div>
                </div>
                <div className="btnDown" onClick={this.moveDown.bind(this)}>
                    <img src="img/mcDown.png" width='auto' height='auto' onClick={this.moveDown.bind(this)}/>
                </div>
            </div>
        )
    }
}
