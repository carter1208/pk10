/**
 * Created by carter on 9/26/2018.
 */
import React,{Component} from 'react'
export default class BetValue extends Component{
    constructor(props){
        super();
        this.state = {
            isShow:false,
            top:0,
            arrNum:[1,2,5,10,20,50]
        };
    }

    componentDidMount(){
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    onClick(e){
        e.preventDefault();
        if(this.props.onClickItem){
            this.props.onClickItem(e.currentTarget.innerHTML);
        }
        this.setState({
            isShow:false
        });
    }

    updateList( show, left, top){
        this.setState({
            isShow:show,
            left: left,
            top: top
        });
    }

    render(){
        let jsxCol = [];
        for (var i = 0; i < this.state.arrNum.length; i++) {
            jsxCol.push(
                <div key={'num' + (this.state.arrNum[i])} id='betValue' onMouseDown={this.onClick.bind(this)}
                     className={'btn ' + 'name' + (i + 1)}>
                    {this.state.arrNum[i]}
                </div>
            );
        }
        return(
            <div className="bet-value" style={{visibility:this.state.isShow ? 'visible':'hidden', left: this.state.left, top:this.state.top + 40}}>
                <div className="tooltiptext"></div>
                {jsxCol}
            </div>
        )
    }
}