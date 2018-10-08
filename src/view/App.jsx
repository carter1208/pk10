import React,{Component} from 'react';
import HomePage from './HomePage'
import {lobbyServer} from "../controller/ServerLobby";

import ServerConfig from "../config/ServerConfig";

class App extends Component {
    constructor(props) {
        super(props);
        this.initConnection();
        this.state = {
            sence: ""
        }
    }

    initConnection() {
        lobbyServer.init(ServerConfig.SERVER_WS);
    }

    render() {
        return (
            <div>
                <HomePage/>
            </div>
        );
    }
}
export default App;