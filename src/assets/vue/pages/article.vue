<template>
    <f7-page id="article">
        <header-nav-bar back>
            <i18n slot="title" :text="chapter.title">
            
            </i18n>
            <i slot="right" class="fa" :class="{ 'fa-heart': isWatched, 'fa-heart-o': !isWatched }" @click="onClickAddFavorite" />
        </header-nav-bar>

        <div class="inner">
            <div class="article-info">
                <!-- <div class="article-title">
                    <dd>{{chapter.title}}</dd>
                </div> -->

                <div class="article-sub">
                    <DateTime v-if="chapter.public_date" :value="chapter.public_date" format="yyyy/mm/dd" class="article-datetime" />
                    <dd class="article-author"><i18n>發表者</i18n> {{chapter.author}}</dd>
                </div>

                <div class="article-image">
                    <img :src="chapter.image" />
                </div>
            </div>
            <div class="article-description cms-article" v-html="html">
            </div>
        </div>

    </f7-page>
</template>

<script>
    import { mapState, mapGetters } from 'vuex';
    import axios from 'assets/js/utils/axios';

    export default {
		data () {
			return {
                html: '',
			};
        },
        computed: {
            ...mapState(['article', 'user']),
            ...mapGetters(['articleChapters']),
            article_id() {
                return this.$f7route.params.article;
            },
            chapter() {

                const article = this.articleChapters.find(e => e.id == this.article_id);
                return article || {};
            },
            isWatched() {
                return this.user.watchlist_articles.findIndex(e => e.article_id == this.article_id) >= 0;
            }
        },
        mounted() {
            this.$store.dispatch('ARTICLE_CHECK').then(this.init);
        },
        methods: {
            init() {
                return axios({
                    uri: `psa/content/${this.article_id}`,
                    success: (data) => {
                        this.html = data;
                    },
                });
            },
            onClickAddFavorite() {
                if (this.isWatched) {
                    const promise = this.$store.dispatch('USER_REMOVE_WATCHLIST_ARTICLE', this.article_id);
                    promise.then(function(){
                        window.f7alert('已移除收藏');
                    });
                } else {
                    const promise = this.$store.dispatch('USER_STORE_WATCHLIST_ARTICLE', this.article_id);
                    promise.then(function(){
                        window.f7alert('已成功將加入我的收藏');
                    });
                }
            },
        },
    };
</script>