/**
 * Created by carter on 9/14/2018.
 */
import React,{Component} from 'react'
import {model} from '../../model/Model'
import {T} from '../../model/language/Translator'
export default class PositionSub extends Component{
    constructor(props){
        super();
    }

    componentDidMount(){
        model.subMenu = '1';//set default....
    }

    activeNav(e){
        e.preventDefault();
        $('a').removeClass('is-active');
        $(e.currentTarget).addClass('is-active');
        model.subMenu = e.currentTarget.id;
        if(this.props.changeSub){
            this.props.changeSub();
        }
    }

    render(){
        return(
            <div className="sub-position">
                <div className="collapse navbar-collapse" id="myNavbar">
                    <ul className="nav navbar-nav navbar-left">
                        <li><a href="#" id="1" className="is-active" onClick={this.activeNav.bind(this)}>{T.translate('lbl1').toUpperCase()}</a></li>
                        <li><a href="#" id="2" onClick={this.activeNav.bind(this)}>{T.translate('lbl2').toUpperCase()}</a></li>
                        <li><a href="#" id="3" onClick={this.activeNav.bind(this)}>{T.translate('lbl3').toUpperCase()}</a></li>
                        <li><a href="#" id="4" onClick={this.activeNav.bind(this)}>{T.translate('lbl4').toUpperCase()}</a></li>
                        <li><a href="#" id="5" onClick={this.activeNav.bind(this)}>{T.translate('lbl5').toUpperCase()}</a></li>
                        <li><a href="#" id="6" onClick={this.activeNav.bind(this)}>{T.translate('lbl6').toUpperCase()}</a></li>
                        <li><a href="#" id="7" onClick={this.activeNav.bind(this)}>{T.translate('lbl7').toUpperCase()}</a></li>
                        <li><a href="#" id="8" onClick={this.activeNav.bind(this)}>{T.translate('lbl8').toUpperCase()}</a></li>
                        <li><a href="#" id="9" onClick={this.activeNav.bind(this)}>{T.translate('lbl9').toUpperCase()}</a></li>
                        <li id="sub10"><a href="#" id="10" onClick={this.activeNav.bind(this)}>{T.translate('lbl10').toUpperCase()}</a></li>
                    </ul>
                </div>
            </div>
        )
    }
}