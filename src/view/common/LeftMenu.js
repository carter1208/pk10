/**
 * Created by carter on 10/17/2018.
 */
import React,{Component} from 'react';
import {model} from '../../model/Model'
import ItemMenu from "./ItemMenu";
export default class LeftMenu extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount() {

    }

    openGame(e){

    }

    render() {
        let jsxCol = [];
        let obj;
        for (let i = 0; i < model.listTable.length; i++){
            obj = model.listTable[i];
            let style = (i == model.listTable.length - 1)? 'none':'1px solid #ccc';
            jsxCol.push(
                <ItemMenu key={i+ 1} line={style} id={obj.id} onClick={this.openGame.bind(this)}/>
            );
        }
        return (
            <div className="left-menu">
                <div className="sroll-content">
                    {jsxCol}
                </div>
            </div>

        )
    }
}
