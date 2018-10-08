/**
 * Created by carter on 9/14/2018.
 */
import React,{Component} from 'react'
export default class DTSub extends Component{
    constructor(props){
        super();
    }

    componentDidMount(){

    }

    activeNav(e){
        e.preventDefault();
        $('a').removeClass('is-active');
        $(e.currentTarget).addClass('is-active');
    }

    render(){
        return(
            <div className="sub-dt">
                <div className="collapse navbar-collapse" id="myNavbar">
                    <ul className="nav navbar-nav navbar-left">
                        <li id="d1"><a href="#"  className="is-active" onClick={this.activeNav.bind(this)}>1V10</a></li>
                        <li><a href="#" onClick={this.activeNav.bind(this)}>2V9</a></li>
                        <li><a href="#" onClick={this.activeNav.bind(this)}>3V8</a></li>
                        <li><a href="#" onClick={this.activeNav.bind(this)}>4V7</a></li>
                        <li><a href="#" id="d5" onClick={this.activeNav.bind(this)}>5V6</a></li>
                    </ul>
                </div>
            </div>
        )
    }
}
