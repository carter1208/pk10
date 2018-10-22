/**
 * Created by carter on 10/22/2018.
 */
import React,{Component} from 'react';
export default class ChipSettingItem extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount() {

    }

    clear(e){

    }
    insert(e){
        console.log('click', e.currentTarget.id);
    }

    render() {
        let objBtn = [];
        if(this.props.isFull){
            objBtn.push(
                <button key={Math.random()} type="button" id ='del' onClick={this.clear.bind(this)}>Delete</button>
            );
        }else {
            objBtn.push(
                <div key={Math.random()}>
                    <button  key={Math.random()} type="button" id ='insert' onClick={this.insert.bind(this)}>Insert</button>
                    <button key={Math.random()} type="button" id ='del' onClick={this.clear.bind(this)}>Delete</button>
                </div>
            );
        }
        return (
            <div className="chip-item">
                <span>{this.props.value}</span>
                {objBtn}
            </div>
        )
    }
}

