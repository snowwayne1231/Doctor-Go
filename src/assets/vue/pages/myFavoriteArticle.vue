<template>
    <f7-page id="my-favorite-article" class="basic-favorite-page">
        <header-nav-bar back>
            <i18n slot="title">文章收藏</i18n>
        </header-nav-bar>

        <div class="inner-content">
            <div class="tool-bar">
                <i18n>編輯</i18n>
            </div>
            <flex-list>
                <fr v-for="data in articles" :key="data.id">
                    <fd class="line-checkbox">
                        <InputCheck v-model="checkedId[data.id]"/>
                    </fd>
                    <fd class="line-image">
                        <ImageLink :image="data.image" />
                    </fd>
                    <fd class="line-info" @click="gotoArticle">
                        <span>{{data.title}}</span>
                        <span class="info-content">{{data.content}}</span>
                    </fd>
                </fr>
            </flex-list>
            <div class="editor-bar">
                <btn class="blue"><i18n>刪除</i18n></btn>
            </div>
        </div>
    </f7-page>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    
    export default {
		data () {
            const articles = [
                { id: 1, title: '皮秒鐳射及雙波長', content: '皮秒鐳射及雙波長皮秒Nd:YAG鐳射治療黑眼圈療效評估', price: 7500, image: 'static/images/articles/shutterstock_60149740.jpg' },
                { id: 2, title: '皮秒鐳射及雙波長II', content: '皮秒鐳射及雙波長皮秒Nd:YAG鐳射治療黑眼圈療效評估', price: 27500, image: 'static/images/articles/shutterstock_60149740.jpg' },
                { id: 3, title: '皮秒鐳射及雙波長III', content: '皮秒鐳射及雙波長皮秒Nd:YAG鐳射治療黑眼圈療效評估', price: 37500, image: 'static/images/articles/shutterstock_60149740.jpg' },
            ];

            const checkedId = {};

            articles.map(e => {
                checkedId[e.id] = false;
            });

			return {
                articles, 
                checkedId,
			};
        },
        methods: {
            gotoArticle() {
                this.$f7router.navigate('/article/');
            },
        },
    };
</script>