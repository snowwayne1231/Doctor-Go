<template>
    <f7-page id="article-publication">
        <header-nav-bar back>
            <i18n slot="title" :text="articleData.title">
            </i18n>
        </header-nav-bar>

        <div class="inner-content" :class="{'no-data': this.articles.length === 0}">
            <flex-list>
                <fr v-for="data in articles" :key="data.id">
                    <fd class="line-image">
                        <ImageLink :image="data.image" />
                    </fd>
                    <fd class="line-info" @click="gotoArticle(data)">
                        <dd>{{data.title}}</dd>
                        <dd class="info-content"><i18n>發表者</i18n> : {{data.author}}</dd>
                    </fd>
                </fr>
            </flex-list>
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
            ...mapState(['article']),
            articleData() {
                return this.article.publications.find(e => e.id == this.$f7route.params.publication);
            },
            articles() {
                return this.article.articles.filter(e => e.publication_id == this.$f7route.params.publication);
            },
        },
        mounted() {
            // debug('article publication', this);
        },
        methods: {
            gotoArticle(data) {
                this.$f7router.navigate(`/article/${data.id}`);
            },
        },
    };
</script>