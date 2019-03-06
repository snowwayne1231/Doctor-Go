<template>
    <div class="home-content">

        <div class="top-tools" ref="topTools">
            <div class="scan"></div>
            <div class="search-bar-wrapper" @click="navigateToSearch"><SearchBar /></div>
            <MessageBox />
        </div>

        <div class="inner-content"  v-on:scroll="onHomeScrolling">
            <BannerSwiper :banners="banners"/>

            <NewsCard :list="newsCardList" ref="NewsCard"/>

            <div class="index-icons">
                <template v-for="(ii, idx) in indexIcons">
                    <IconBlock :icon="ii.icon" :word="ii.word" :key="idx" :link="ii.link"/>
                </template>
            </div>

            <div class="index-image-links">
                <template v-for="(ii, idx) in imageLinks">
                    <f7-link :href="ii.link" :key="idx" class="image-link"><img class="image" :src="ii.image"/></f7-link>
                </template>
            </div>

            <block-headmore title="品牌專區" linkMore="/productbrand/">
                <div class="index-brands">
                    <table class="inner">
                        <tbody>
                            <tr>
                                <td class="brand"><ImageLink image="static/images/brands/img_brand01@2x.png" link="/productbrand/ellanse"/></td>
                                <td class="brand"><ImageLink image="static/images/brands/img_brand02@2x.png" link="/productbrand/utims"/></td>
                                <td class="brand"><ImageLink image="static/images/brands/img_brand03@2x.png" link="/productbrand/body-jet-evo"/></td>
                            </tr>
                            <tr>
                                <td class="brand"><ImageLink image="static/images/brands/img_brand04@2x.png" link="/productbrand/re-o"/></td>
                                <td class="brand"><ImageLink image="static/images/brands/img_brand05@2x.png" link="/productbrand/restylane"/></td>
                                <td class="brand"><ImageLink image="static/images/brands/img_brand06@2x.png" link="/productbrand/juvederm"/></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </block-headmore>

            <div class="recommand-products" v-if="isLogin">
                <block-headmore title="推薦商品" linkMore="/productlistfilter/hot">
                    <div class="products">
                        <ProductItem
                            v-for="idx in 2"
                            :key="idx"
                            name="123"
                            image="static/images/products/el-650x650.png"
                            :price="7500" />
                    </div>
                </block-headmore>

                <block-headmore title="醫美儀器設備" linkMore="/productlistfilter/equipment">
                    <div class="products">
                        <ProductItem
                            v-for="idx in 2"
                            :key="idx"
                            name="123"
                            image="static/images/products/el-650x650.png"
                            :price="700000" />
                    </div>
                </block-headmore>

                <block-headmore title="保養系列" linkMore="/productlistfilter/maintenance">
                    <div class="products">
                        <ProductItem
                            v-for="idx in 2"
                            :key="idx"
                            name="123"
                            image="static/images/products/el-650x650.png"
                            :price="4900" />
                    </div>
                </block-headmore>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
    data() {
        return {
            topToolShowBackground: false,
            banners: [
                'static/images/banners/main_topBg@2x.png',
                'static/images/banners/main_topBg@2x.png',
                'static/images/banners/main_topBg@2x.png',
            ],
            newsCardList: [
                { title: '美醫聯購', type: '頭條', headline: '2月滿額送好禮' },
                { title: '美醫聯購', type: '頭條', headline: '四月滿額送好禮 歡樂送送' },
                { title: '美醫聯購', type: '頭條', headline: '6月滿額送好禮 天天都免費 甚麼都可以免費帶走' },
            ],
            indexIcons: [
                { word: '美醫指南', icon: 'static/images/icons/main_icon02@4x.png', link:'/tab-article' },
                // { word: '關於我們', icon: 'static/images/icons/main_icon01@4x.png', link:'/aboutus/' },
                { word: '點數中心', icon: 'static/images/icons/main_icon09@4x.png', link:'/redeemingcenter/' },
                { word: '團購專區', icon: 'static/images/icons/main_icon10@4x.png', link:'/collectivebuying/' },
                // { word: '聯絡我們', icon: 'static/images/icons/main_icon04@4x.png', link:'/contactus/' },
                { word: '醫美儀器', icon: 'static/images/icons/main_icon05@4x.png', link:'/productlistfilter/equipment' },
                { word: '醫美耗材', icon: 'static/images/icons/main_icon06@4x.png', link:'/productlistfilter/consumable' },
                { word: '二手商品', icon: 'static/images/icons/main_icon07@4x.png', link:'/productlistfilter/second' },
                { word: '醫美保養品', icon: 'static/images/icons/main_icon08@4x.png', link:'/productlistfilter/maintenance' },
                { word: '兩岸獵才', icon: 'static/images/icons/main_icon03@4x.png', link: 'http://www.psbeauty.com.tw/job/' },
            ],
            imageLinks: [
                { image: 'static/images/banners/banner_01@3x.png', link:'/productlistfilter/new' },
                { image: 'static/images/banners/banner_02@3x.png', link:'/productlistfilter/discount' },
                { image: 'static/images/banners/banner_03@3x.png', link:'/productlistfilter/primary' },
                { image: 'static/images/banners/banner_04@3x.png', link:'/productlistfilter/event' },
                // { image: 'static/images/banners/banner_05@3x.png', link:'/productlistfilter/equipment' },
                // { image: 'static/images/banners/banner_06@3x.png', link:'/productlistfilter/second' },
            ],
        };
    },
    computed: {
        ...mapGetters(['isLogin']),
        ...mapState({
            user: state => { return state.user },
        }),
    },
    mounted() {
        debug('mounted tab home', this);
        
        // const routeHome = this.$f7router.routes.find(e => e.name == 'Home');
        
        // const pathArray = window.location.hash.split(/[\\\/]/g).filter(e => !!e);
        
        // const pathHash = '/' + pathArray.pop();

        // const isHomePath = routeHome.tabs.findIndex(e => e.path == pathHash) != -1;
        
        // if (isHomePath) {
        //     const notMatch = pathHash != this.$f7route.path;
        //     debug('mounted tab home pathHash: ', pathHash, ', f7route: ', this.$f7route.path);
        //     debug('mounted tab home pathArray: ', pathArray, ', notMatch: ', notMatch);
        //     debug('F7 router history', this.$f7router.history);

        //     if (notMatch) {
        //         // window.location.hash = '';
        //         this.$f7router.navigate(this.$f7route.path);
        //     }
        // }
    },
    methods: {
        onHomeScrolling(evt) {
            const homeScrollTop = evt.target.scrollTop;
            const newsCardTop = this.$refs.NewsCard.$el.offsetTop;
            const toolHeight = this.$refs.topTools.offsetHeight;
            if (this.topToolShowBackground) {
                if (homeScrollTop < newsCardTop - toolHeight) {
                    this.$refs.topTools.classList.remove('background');
                    this.topToolShowBackground = false;
                }
            } else {
                if (homeScrollTop > newsCardTop - toolHeight) {
                    this.$refs.topTools.classList.add('background');
                    this.topToolShowBackground = true;
                }
            }
            // debug(homeScrollTop, toolHeight, newsCardTop);
        },
        navigateToSearch() {
            this.$f7router.navigate('/search/');
        },
    },
};

</script>
