/**
 * Created by carter on 10/19/2018.
 */
import React,{Component} from 'react';
import {T} from "../../model/language/Translator";
export default class ItemHistory extends Component{
    constructor(props){
        super(props);
        this.indexX = this.props.id > 5 ? this.props.id - 6 : this.props.id - 1;
        this.indexY = this.props.id > 5 ? 1 : 0;
        this.state={
            pos:this.props.pos
        }
    }

    componentDidMount() {
    }

    updateResult(x, y, idx){
        let px = x - this.indexX * 168;
        let py = y - this.indexY * 74;
        this.tween = TweenLite.to(this.item, 0.5, {x: px, y:py});
        this.setState({
            pos:idx
        })
    }
    setPosition(x, y){
        this.x = x;
        this.y = y;
    }

    render() {
        return (
            <div className={'item-his'+this.props.id} id={'item'} ref={div => this.item = div}>
                <div className="info">
                    <div className={'num' + this.props.id} id="num">{this.props.id}</div>
                    <div className="idx">{T.translate('lbl'+this.state.pos)}</div>
                </div>
                <img src={'img/car-' + this.props.id + '.png'} width='120' height='39'/>
            </div>
        )
    }
}