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
const homeRoute = routes.find(e => e.name == 'Home');

export default {
    data() {
        return {
            f7params: {
                name: 'DOCTOR-GO',
                theme: 'ios',
                routes,
                id: 'io.f7.snow.doctor',
                on: {
                    init() {
                        settingDebug({
                            mode: 0,
                            device: window.device || {},
                        });
                        debug('INIT', this, window.device);
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
            }
        }
    },
    mounted() {
        // debug('Main Mounted', this);
        // alert('Main Mounted');
        if (!this.$store.state.user.id) {
            const localUser = localStorage.getItem('user');
            // console.log(localUser);
            if (localUser) {
                this.$store.dispatch('USER_LOGIN', JSON.parse(localUser));
            }
        }
    },
}
</script>