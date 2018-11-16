/**
 * Created by carter on 9/14/2018.
 */
import React,{Component} from 'react'
export default class CombineSub extends Component{
    constructor(props){
        super();
    }

    componentDidMount(){

    }

    activeNav(e){
        e.preventDefault();
        $('a').removeClass('is-active');
        $(e.currentTarget).addClass('is-active');
        if(this.props.hdlChangeSub){
            this.props.hdlChangeSub(e.currentTarget.id);
        }
    }

    render(){
        return(
            <div className="sub-combine">
                <div className="collapse navbar-collapse" id="myNavbar">
                    <ul className="nav navbar-nav navbar-left">
                        <li><a href="#" id="combine2-" className="is-active" onClick={this.activeNav.bind(this)}>1ST + 2ND</a></li>
                        <li id="cb3"><a href="#" id="combine3-" onClick={this.activeNav.bind(this)}>1ST + 2ND + 3RD</a></li>
                    </ul>
                </div>
            </div>
        )
    }
}
