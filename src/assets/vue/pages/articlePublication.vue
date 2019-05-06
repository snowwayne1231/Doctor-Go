<template>
    <f7-page id="article-publication">
        <header-nav-bar back>
            <i18n slot="title" :text="articleData.title">
            </i18n>
        </header-nav-bar>

        <div class="inner-content" :class="{'no-data': this.chapters.length === 0}">
            <flex-list>
                <fr v-for="data in chapters" :key="data.id">
                    <fd class="line-image" @click="gotoArticle(data)">
                        <ImageLink :image="data.image" />
                    </fd>
                    <fd class="line-info" @click="gotoArticle(data)">
                        <dd>{{data.title}}</dd>
                        <dd class="info-content">
                            <i18n>發表者</i18n> : {{data.author}}
                        </dd>
                        <dd><DateTime :value="data.public_date" format="yyyy/mm/dd" /></dd>
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
                return this.article.publications.find(e => e.id == this.$f7route.params.publication) || {};
            },
            chapters() {
                const now = new Date().getTime();
                return (this.articleData.chapters || []).filter(e => new Date(e.public_date).getTime() <= now);
            },
        },
        mounted() {
            // debug('article publication', this);
            this.$store.dispatch('ARTICLE_CHECK');
        },
        methods: {
            gotoArticle(data) {
                this.$f7router.navigate(`/article/${data.id}`);
            },
        },
    };
</script>