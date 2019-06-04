<template>
    <div class="tab-article-content">
        <header-nav-bar>
            <i18n slot="title">PSA美醫指南</i18n>
        </header-nav-bar>
        <div class="inner">
            <div v-if="isLogin" class="list ptr-content custom-scroll" @ptr:refresh="onPtr" @scroll="onScroll" ref="scrollzone">
                <!-- <div class="ptr-preloader">
                    <div class="preloader"></div>
                    <div class="ptr-arrow"></div>
                </div> -->
                
                <li v-for="data in publications" :key="data.id" class="item">
                    
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
            <div v-else class="please-login">
                <f7-link href="/login/"><i18n>登入即可觀看</i18n></f7-link>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
export default {
    data() {
        return {
            max: 3,
        };
    },
    computed: {
        ...mapGetters(['isLogin']),
        ...mapState(['article', 'user']),
        publications(self) {
            return self.article.publications.filter((e,idx) => idx < self.max);
        },
        isOverflow(self) {
            return self.max < self.article.publications.length;
        },
    },
    mounted() {
        // debug(this.article);
        this.init();
    },
    methods: {
        init() {
            this.$store.dispatch('ARTICLE_CHECK');
        },
        onPtr() {
            this.$store.dispatch('ARTICLE_FETCH_MAGAZINES').then(() => {
                this.$f7.ptr.done();
            });
        },
        onScroll() {
            if (this.isOverflow) {
                const dom = this.$refs.scrollzone;

                const clientHeight = dom.clientHeight;
                const scrollTop = dom.scrollTop;
                const scrollHeight = dom.scrollHeight;

                // console.log([dom], clientHeight);

                if (clientHeight + scrollTop > scrollHeight - 50) {
                    this.max += 2;
                }
            }
        },
    },
};

</script>
