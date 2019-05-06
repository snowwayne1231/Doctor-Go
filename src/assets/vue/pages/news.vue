<template>
    <f7-page id="news">
        <header-nav-bar back>
            <i18n slot="title">
                最新消息
            </i18n>
        </header-nav-bar>

        <div class="inner-content">
            <collapse-item v-for="data in news" :key="data.id">
                <div slot="header" class="inline-middle nowrap news-header">
                    <span class="type middle">{{data.type}}</span>
                    <span class="text middle">{{data.headline}}</span>
                    <i class="fa fa-external-link" @click="onExternalLinkClick(data)"></i>
                </div>
                <div slot="content" v-if="data.content">
                    <textarea readonly v-model="data.content" class="content-textarea">
                    
                    </textarea>
                   
                </div>
            </collapse-item>
        </div>

    </f7-page>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    import { getPathByNewsData } from 'assets/js/utils/navigateHandlers';
    

    export default {
		data () {
			return {
                
			};
        },
        computed: {
            ...mapState(['ad']),
            news() {
                return this.ad.news;
            },
        },
        mounted() {
            this.$store.dispatch('AD_FETCH_NEWS');
        },
        methods: {
            onExternalLinkClick(data) {
                const path = getPathByNewsData(data);
                this.$f7router.navigate(path);
            },
        },
    };
</script>