/**
 * Created by loc on 6/12/2017.
 */
import Language from '../../constant/Language';
import LanguageInfo from "./LanguageInfo";
import {model} from "../Model";
import EventType from '../../constant/EventType';
class Translator {
    constructor() {
        this.lang = Language.ENGLISH;
        this.info = new LanguageInfo();
    }
    init(data) {
        this.info.initLanguage(data);
    }
    setLanguage(lang) {
        this.lang = lang;
        this.info.setLanguage(lang);
        model.update(EventType.UPDATE_LANGUAGE);
    }
    getLanguage() {
        return this.lang;
    }
    translate(key) {
        return this.info.getText(key);
    }
}
export let T = new Translator();
