<template>
    <f7-page id="news">
        <header-nav-bar back>
            <i18n slot="title">
                最新消息
            </i18n>
        </header-nav-bar>

        <div class="inner-content">
            <collapse-item v-for="data in news" :key="data.id">
                <div slot="header" class="inline-middle nowrap">
                    <span class="type middle">{{data.type}}</span>
                    <span class="text middle">{{data.headline}}</span>
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
            
        },
    };
</script>