// Import Vue
import Vue from 'vue';

// Import Framework7
import Framework7 from 'framework7/framework7.esm.bundle.js';

// Import Framework7 Vue
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js';

// Import F7 Style
import Framework7CSS from 'framework7/css/framework7.css';

// Import F7 iOS Icons
import Framework7Icons from 'framework7-icons/css/framework7-icons.css';

// Import Material Icons
// import MaterialIcons from 'material-design-icons/iconfont/material-icons.css';

// Import Fontawesome Theme Styles
import FontAwesome from 'font-awesome/css/font-awesome.css';

// Import App Custom Styles
import AppStyles from './assets/sass/main.scss';

// Import App Component
import app from './main.vue';


// Import Vuex Storage
import store from './assets/vuex/storage.js';

import configEnv from './config-env.js';

window.env = configEnv;

function wErrorHandler(errorMsg, url, lineNumber) {
    // alert("Error occured: " + errorMsg);//or any message
    // var app = document.getElementById('app');
    var data = {
        msg: errorMsg,
        url,
        line: lineNumber, 
    };
    // if (app) app.innerHTML = app.innerHTML + `<br /> ${errorMsg} <br /> ${url} <br /> ${lineNumber} <br /> `;
    store.dispatch('AXIOS_SEND_ERROR', data);
    
    return false;
}

function checkVersion() {
    try {
        window.console.log('CheckVersion!!');
        if (
            !window.console.error || 
            typeof window.Promise === 'undefined'
        ) {
            return false;
        }
        var p = new Promise((a,b)=>{}).finally(e => e);
    } catch (err) {
        return false;
    }
    
    return true;
}


if (checkVersion()) {
    window.onerror = wErrorHandler;

    // Different F7-Vue plugin initialization with f7 v3.0
    Framework7.use(Framework7Vue);

    // import upperFirst from 'lodash/upperFirst';

    const requireHelper = require.context(
        'assets/js/helper',
        true,
        /\.js.?$/i,
    );

    requireHelper.keys().forEach(path => {
        const fileName = path.split('/').pop().replace(/^(.*)\.\w+$/, '$1');
        const config = requireHelper(path);
        window[fileName] = config.default || config;
    });

    const requireComponent = require.context(
        'assets/vue',
        true,
        /\/_[\/\\\w\-]+\.(vue|js)$/i,
    );

    requireComponent.keys().forEach(path => {
        const componentConfig = requireComponent(path);
        const fileName = path.split('/').pop();

        const componentName = fileName.replace(/^(.*)\.\w+$/, '$1');

        Vue.component(
            componentName,
            componentConfig.default || componentConfig,
        );
    });

    const vueApp = new Vue({
        el: '#app',
        store,
        render: c => c('app'),
        components: {app},
    });

    window.app = vueApp;
} else {
    window.alert('System Version Too Old.');
    document.getElementById('app').innerHTML = 'Is Not Supported.';
}


// Init Vue App
export default app;