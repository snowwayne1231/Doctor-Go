
import axios from 'axios';
import store from 'assets/vuex/storage';
import i18n from 'assets/js/utils/i18n';
import config from 'src/config-env';

const mainServer = config.mainServer;
axios.defaults.timeout = 12000;

function customAxios({uri, method, data, success, fail, final}) {

    const deplicateUri = store.state.axios.fetching.find(e => e.uri === uri);

    if (deplicateUri) {
        debug('AXIOS Duplicate', deplicateUri);
        return deplicateUri.promise;
    }
    
    const url = `http://${mainServer}/api/${uri || ''}`;
    const _method = method || 'get';
    const setting = {
        url,
        method: _method,
        headers: {
            'X-Auth-Token': store.state.user.token,
            'X-UUID': window.device ? window.device.uuid || 'browser' : 'not prepare yet',
        },
    };

    if (_method === 'get') {
        setting['params'] = data;
    } else {
        setting['data'] = data;
    }
    
    const promise = axios(setting);
    const $this = {uri, setting, promise};

    store.dispatch('AXIOS_FETCHING_START', $this);

    promise.then(remote200.bind($this)).catch(remoteFail.bind($this)).finally(remoteFinally.bind($this));
    
    return promise;
    

    function remote200(response) {
        switch (true) {
        case !response.data:
            remoteFail('No Data Response.');
            break;
        case response.data.errors:
            remoteFail(response.data.errors);
            break;
        default:
            success && success.call(this, response.data.result, this);
        }
        return this;
    }

    function remoteFail(error) {
        const setting = this;
        let errorMsg;
        let errorRedirect;
        let errorLogout;
        let refresh = false;
        
        if (error.response && error.response.data) {
            errorMsg = typeof error.response.data.errors === 'string'
                ? error.response.data.errors
                : Object.values(error.response.data.errors).join(' <br />\r\n');
            errorRedirect = error.response.data.redirect;
            errorLogout = !!error.response.data.logout;
        } else if (error.message) {
            errorMsg = error.message;
            if (errorMsg.match(/timeout of/i)) {
                errorMsg = i18n('連線逾時請稍後再試');
                refresh = true;
            } else if (errorMsg.match(/network error/i)) {
                errorMsg = i18n('連線異常請稍後再試');
                refresh = true;
            }
            
        } else {
            errorMsg = typeof error === 'string'
                ? error
                : Object.values(error).join(' <br />\r\n');
        }
        
        if (fail) {
            fail.call(this, errorMsg, this);
        } else {
            // default fail;
            window.f7alert && window.f7alert(errorMsg, callback);
        }
        debug('remoteFail', this, errorMsg, error);
        return this;

        function callback(dialog) {
            // debug('callback', this);
            if (errorLogout && store.getters.isLogin) {
                store.dispatch('USER_LOGOUT');
            }

            if (refresh) {
                window.location.reload();
                // console.log('refresh setting', setting);
            } else if (typeof errorRedirect === 'string') {
                window.app && window.app.$f7 && window.app.$f7.view.current.router.navigate(errorRedirect);
            }
        }
    }

    function remoteFinally() {
        final && final.call(this, this);
        store.dispatch('AXIOS_FETCHING_END', this);
        return this;
    }
}

export default customAxios;
