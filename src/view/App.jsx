import React,{Component} from 'react';
import HomePage from './HomePage'
import {lobbyServer} from "../controller/ServerLobby";
import {gameServer} from "../controller/ServerGame";

import {request} from "../loader/HttpRequest";
import {T} from "../model/language/Translator";

import Language from '../constant/Language';

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
        gameServer.init(ServerConfig.SERVER_WS);
    }
    componentDidMount() {
        this.loadLanguage();
    }

    componentWillUnmount() {

    }

    loadLanguage() {
        //load language
        request.get("./assets/LotteryLanguage.xml", null, this.onLoadLanguage.bind(this), this.onLoadLanguageError.bind(this));
    }

    onLoadLanguage(data) {
        let parser;
        let xml;
        if (window.DOMParser) {
            // code for modern browsers
            parser = new DOMParser();
            xml = parser.parseFromString(data,"text/xml");
        } else {
            // code for old IE browsers
            xml = new ActiveXObject("Microsoft.XMLDOM");
            xml.async = false;
            xml.loadXML(data);
        }
        T.init(xml.documentElement);
        T.setLanguage(Language.ENGLISH);
        this.refs.home.show();
    }

    onLoadLanguageError(error) {
    }

    render() {
        return (
            <div>
                <HomePage ref="home"/>
            </div>
        );
    }
}
export default App;