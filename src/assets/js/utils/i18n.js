// import json from '../../json/i18n.json';
import tw2ch from '../mapping/tongwen-ts';

const languages = ['zh_tw', 'zh_cn', 'en'];
let locale = localStorage.getItem('i18n-locale');
if (!locale || languages.indexOf(locale) < 0) {
    locale = languages[0];
}

function toSimp(txt){

    txt = txt.replace(/[^\x00-\xFF]/g, replaceFn);

    return txt;

    function replaceFn(s){
        return tw2ch[s] || s;
    }
}

function i18n(str) {
    switch (locale) {
    case languages[1]:
        return toSimp(str);
    default:
        return str;
    }
}

export default i18n;
