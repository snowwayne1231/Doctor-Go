<template>
    <div class="tab-article-content">
        <header-nav-bar>
            <i18n slot="title">PSA美醫指南</i18n>
        </header-nav-bar>
        <div class="inner custom-scroll">
            <div class="list">
                <li v-for="data in article.publications" :key="data.id" class="item">
                    
                    <div class="inner">
                        <ImageLink class="item-image" :image="data.image" />
                        <div class="item-title">
                            {{data.title}}
                        </div>
                        <div class="item-after">
                            <div class="info">
                                <DateTime :value="data.public_date" format="yyyy/mm/dd" />
                                <!-- <dd><i18n>發表者</i18n> {{data.author}}</dd> -->
                            </div>
                            <f7-link :href="`/articlepublication/${data.id}`"><btn class="blue">閱讀更多</btn></f7-link>
                        </div>
                    </div>
                
                </li>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    data() {
        return {
            
        }
    },
    computed: {
        ...mapState(['article']),
    },
    mounted() {
        // debug(this.article);
        this.init();
    },
    methods: {
        init() {
            this.$store.dispatch('ARTICLE_CHECK');
        },
    },
};

</script>
