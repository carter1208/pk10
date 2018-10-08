/**
 * Created by carter on 9/28/2018.
 */
import React, {Component, PropTypes} from 'react';
import {lobbyServer} from '../../controller/ServerLobby'
import ListTable from "./ListTable";
import TopPanel from "./TopPanel";
import PopupContainer from "../../component/PopupContainer";

export default class Lobby extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {

    }
    componentWillUnmount() {
    }


    render() {
        return (
            <div className="main-container">
                <TopPanel/>
                <ListTable/>
                <PopupContainer/>
            </div>
        )
    }
}
