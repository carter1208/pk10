/**
 * Created by carter on 10/17/2018.
 */
import React,{Component} from 'react';
import {model} from '../../model/Model'
export default class ItemMenu extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount() {

    }

    hdlMouseOver(e){
        $(e.currentTarget).css('backgroundColor', '#F7D7D9')
    }

    hdlMouseOut(e){
        $(e.currentTarget).css('backgroundColor', '#f5f5f5')
    }

    render() {
        let logoID = 'img/logo'+ (this.props.id == 77 ? "_"+ this.props.id: this.props.id) +'.png';
        return (
            <div className="item" ref={'tb'+ this.props.id} id={this.props.id} style={{borderBottom:this.props.line}} onMouseOver={this.hdlMouseOver.bind(this)} onMouseOut={this.hdlMouseOut.bind(this)}>
                <div className="logo1"><img src='img/pk10Menu.png'/></div>&nbsp;&nbsp;
                <div className="logo2"><img src={logoID} width='70%' height='70%'/></div>
            </div>
        )
    }
}
