/**
 * Created by carter on 9/20/2018.
 */
import React,{Component} from 'react'
export default class ListNumber extends Component{
    constructor(props){
        super(props);
        this.state={
            isShow:false,
            arrNum:[1,2,3,4,5,6,7,8,9,10],
            left: 0,
            top: 0
        }
    }

    componentDidMount(){
    }

    onClick(event){
        event.preventDefault();
        if(this.props.onClickItem){
            this.props.onClickItem(event.currentTarget.innerHTML);
        }
        this.setState({
            isShow:false
        });
    }

    updateList(arr, show, left, top){
        this.setState({
            isShow:show,
            arrNum:arr,
            left: left,
            top: top
        });
    }

    render(){
        let jsxRow = [];
        let jsxCol = [];
        for (var i = 0; i < this.state.arrNum.length; i++){
            if (jsxCol.length > 0) {
                jsxCol.push(<div key={'spacex'+ (i+ 1)} className="space-x"/>);
            }
            jsxCol.push(
                <div key={'num'+(this.state.arrNum[i])} id='number' onMouseDown={this.onClick.bind(this)} className={'btn '+'name'+ (this.state.arrNum[i])}>
                    {this.state.arrNum[i]}
                </div>
            );
            if (jsxRow.length > 0) {
                jsxRow.push(<div key={'spacey' + i} className="space-y"/>);
            }
            if (jsxCol.length > 7 || i == this.state.arrNum.length -1) {
                jsxRow.push(
                    <div key={'row'+(i+ 1)} className="table-row">
                        {jsxCol}
                    </div>
                );
                jsxCol = [];
            }
        }
        return(
            <div className={'listNum'} style={{visibility:this.state.isShow ? 'visible':'hidden', left: this.state.left, top:this.state.top + 35}}>
                {jsxRow}
            </div>
        )
    }
}