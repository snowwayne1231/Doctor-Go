<template>
    <f7-page class="home" tabs keepAlive>
        <f7-tabs class="home-tabs custom-scroll" routable>
            <f7-tab id="tab-home">
                
            </f7-tab>

            <f7-tab id="tab-catalog">
                <!-- <tabCatalog /> -->
            </f7-tab>

            <f7-tab id="tab-cart">
                <!-- <tabCart /> -->
            </f7-tab>

            <f7-tab id="tab-article">
                <!-- <tabArticle /> -->
            </f7-tab>

            <f7-tab id="tab-my">
                <!-- <tabMy /> -->
            </f7-tab>
        </f7-tabs>

        <div class="toolbar tabbar tabbar-labels">
            <div class="toolbar-inner">
                <a href="/tab-home" class="tab-link" data-route-tab-id="tab-home">
                    <f7-icon class="fa fa-home" />
                    <i18n class="tabbar-label">首頁</i18n>
                </a>
                <a href="/tab-catalog" class="tab-link" data-route-tab-id="tab-catalog" :class="{ hide:!isLogin }">
                    <f7-icon class="fa fa-th-list" />
                    <i18n class="tabbar-label">分類</i18n>
                </a>
                <a href="/tab-cart" class="tab-link" data-route-tab-id="tab-cart" :class="{ hide:!isLogin }">
                    <f7-icon class="fa fa-shopping-cart" />
                    <i18n class="tabbar-label">購物車</i18n>
                </a>
                <a href="/tab-article" class="tab-link" data-route-tab-id="tab-article">
                    <f7-icon class="fa fa-book" />
                    <i18n class="tabbar-label">美醫指南</i18n>
                </a>
                <a :href="isLogin ? '/tab-my' : '/login/'" class="tab-link" data-route-tab-id="tab-my">
                    <f7-icon class="fa fa-user" />
                    <i18n class="tabbar-label">我的</i18n>
                </a>
            </div>
        </div>
            
    </f7-page>
</template>

<script>
// import tabCatalog from './tabCatalog';
// import tabCart from './tabCart';
// import tabArticle from './tabArticle';
// import tabMy from './tabMy';

import { mapState, mapGetters } from 'vuex';

export default {
    data() {
        return {
            showingHome: false,
        };
    },
    computed: {
        ...mapGetters(['isLogin']),
        ...mapState({
            user: state => { return state.user; },
            isLoading: state => { return state.axios.isLoading; },
        }),
    },
    mounted() {
        debug('mounted HOME', this);
        this.$store.dispatch('PRODUCT_FETCH_LIST');
    },
    methods: {
        onClickTabMy(evt) {
            if (!this.isLogin) {
                evt.preventDefault();
                evt.stopPropagation();
                this.$f7router.navigate('/login/');
            }
        },
    },
};

</script>
