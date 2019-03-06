<template>
    <f7-page id="article">
        <header-nav-bar back>
            <i18n slot="title" :text="article.title">
            
            </i18n>
        </header-nav-bar>

        <div class="inner">
            <div class="article-info">
                <div class="article-title">
                    <dd>{{article.title}}</dd>
                </div>

                <div class="article-sub">
                    <DateTime :value="article.dateTime" class="article-datetime" />
                    <dd class="article-author"><i18n>發表者</i18n> {{article.author}}</dd>
                </div>

                <div class="article-image">
                    <img src="http://www.doctor-go.com/image/catalog/PSA03/shutterstock_60149740.jpg" />
                </div>
            </div>
            <div class="article-description cms-article" v-html="article.html">
            </div>
        </div>

    </f7-page>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    

    export default {
		data () {
			return {
                article: {
                    author: 'PSA-03',
                    title: '皮秒鐳射及雙波長皮秒Nd:YAG鐳射治療黑眼圈療效評估',
                    dateTime: '2019-02-05T12:04:30.663Z',
                    html: require('static/html/example_article.html'),
                },
			};
        },
        mounted() {
            debug('article page', this);
        },
        methods: {
            
        },
    };
</script>