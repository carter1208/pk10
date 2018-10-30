/**
 * Created by loc on 6/13/2017.
 */
export default class LanguageInfo {
    constructor() {
        this.keys       = null;
        this.contents   = null;
        this.lang       = "";
        this.selected   = null;
    }

    initLanguage(xmlNode) {
        if (xmlNode == null) {
            return;
        }
        this.keys = [];
        this.contents = {G:[],B:[],T:[],K:[],J:[],V:[],M:[],E:[]};
        Array.prototype.map.call(xmlNode.childNodes, (node)=>{
            if (node.attributes){
                this.keys.push(node.attributes['id'].value);
                this.contents.G.push(node.attributes["langG"].value);
                this.contents.B.push(node.attributes["langB"].value);
                this.contents.T.push(node.attributes["langT"].value);
                this.contents.K.push(node.attributes["langK"].value);
                this.contents.J.push(node.attributes["langJ"].value);
                this.contents.V.push(node.attributes["langV"].value);
                this.contents.M.push(node.attributes["langM"].value);
                this.contents.E.push(node.attributes["langE"].value);
            }
        });
    }

    setLanguage(lang) {
        this.lang = lang;
        this.selected = this.contents[lang];
    }

    getText(key) {
        let text = key;
        let idx = this.keys.indexOf(key);
        if (idx != -1) {
            text = this.selected[idx];
        }
        return text;
    }
}
