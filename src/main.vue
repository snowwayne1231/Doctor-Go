<template>
    <!-- App -->
    <f7-app :params="f7params">
        <f7-view url="/" :main="true" :pushState="true" class="meta-root" ></f7-view>
    </f7-app>
</template>
<script>
// Import Routes...
import routes from './routes.js';
import { settingDebug } from './assets/js/helper/debug';
import i18n from './assets/js/utils/i18n';
import store from './assets/vuex/storage';

const homeRoute = routes.find(e => e.name == 'Home');

export default {
    data() {
        return {
            f7params: {
                name: 'DOCTOR-GO',
                theme: 'ios',
                routes,
                id: 'io.f7.snow.doctor',
                initOnDeviceReady: true,
                on: {
                    init() {
                        settingDebug({
                            mode: 0,
                            device: window.device || {},
                        });
                        debug('INIT', this, window.device);

                        // make global alert function
                        window.f7alert = (txt, callback) => this.dialog.alert(i18n(txt), callback);

                        // make global router function
                        window.f7router = this.router;

                        if (!store.state.user.id) {
                            const localUser = localStorage.getItem('user');
                            
                            if (localUser) {
                                const user = JSON.parse(localUser);
                                if (user.token) {
                                    store.dispatch('USER_FETCH_USER_INFO', user.token);
                                }
                                
                            }
                        }
                    },
                    routeChanged(newRoute, previousRoute, router) {
                        const firstHistory = router.history[0] || '/';
                        const isWrongStart = homeRoute.tabs.findIndex(tab => tab.path === firstHistory) === -1;
                        const isTwiceHome = router.history.filter(e => homeRoute.tabs.includes(e)).length >= 2;
                        debug('router.history', router.history);

                        if (isWrongStart || isTwiceHome) {
                            
                            debug('reloadAll', isWrongStart, isTwiceHome);
                            // router.navigate('/', { reloadAll: true });
                            router.clearPreviousHistory();
                        }
                    },
                },
                dialog: {
                    title : i18n('系統提示'),
                    buttonOk: i18n('確定'),
                    buttonCancel: i18n('取消'),
                }
            }
        }
    },
    mounted() {
        // debug('Main Mounted', this);
    },
}
</script>