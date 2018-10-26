/**
 * Created by carter on 9/14/2018.
 */
import React,{Component} from 'react'
import {model} from '../../model/Model'
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
                        <li><a href="#" id="1" className="is-active" onClick={this.activeNav.bind(this)}>1ST</a></li>
                        <li><a href="#" id="2" onClick={this.activeNav.bind(this)}>2ND</a></li>
                        <li><a href="#" id="3" onClick={this.activeNav.bind(this)}>3RD</a></li>
                        <li><a href="#" id="4" onClick={this.activeNav.bind(this)}>4TH</a></li>
                        <li><a href="#" id="5" onClick={this.activeNav.bind(this)}>5TH</a></li>
                        <li><a href="#" id="6" onClick={this.activeNav.bind(this)}>6TH</a></li>
                        <li><a href="#" id="7" onClick={this.activeNav.bind(this)}>7TH</a></li>
                        <li><a href="#" id="8" onClick={this.activeNav.bind(this)}>8TH</a></li>
                        <li><a href="#" id="9" onClick={this.activeNav.bind(this)}>9TH</a></li>
                        <li id="sub10"><a href="#" id="10" onClick={this.activeNav.bind(this)}>10TH</a></li>
                    </ul>
                </div>
            </div>
        )
    }
}