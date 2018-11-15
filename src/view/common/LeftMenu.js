/**
 * Created by carter on 10/17/2018.
 */
import React, {Component} from "react";
import {model} from "../../model/Model";
import ItemMenu from "./ItemMenu";
import Command from "../../constant/Command";
export default class LeftMenu extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    openGame(e) {
        console.log('click', e.currentTarget.id, model.clientReady);
        if (!model.clientReady) return;
        model.update(Command.OPEN_TABLE, e.currentTarget.id);
    }

    render() {
        let jsxCol = [];
        let obj;
        for (let i = 0; i < model.listTable.length; i++) {
            obj = model.listTable[i];
            let style = '1px solid #ccc';
            jsxCol.push(
                <ItemMenu key={i + 1} line={style} id={obj.id} onOpenGame={this.openGame.bind(this)}/>
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
