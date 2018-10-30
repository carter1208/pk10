/**
 * Created by carter on 10/30/2018.
 */
import * as PIXI from 'pixi.js';
import {T} from '../../model/language/Translator'
export default class HistoryIcon extends PIXI.Container{
    constructor(props){
        super(props);
        this.stage = new PIXI.Container();
        this.txtStyle = {fontSize:8, align : 'center'};
        this.txt = new PIXI.Text('');
        this.txt.anchor.set(0.5, 0.5)
        this.stage.addChild(this.txt);
        this.addChild(this.stage);
    }

    setColor( color){
        this.txtStyle = {fontSize:12, fill:color, align : 'center'};
        this.txt.style = this.txtStyle;
    }

    setText(text){
        this.txt.text = T.translate(text);
    }
}
