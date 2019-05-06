<template>
    <div class="home-content">

        <div class="top-tools" ref="topTools">
            <div class="scan"></div>
            <div class="search-bar-wrapper" @click="navigateToSearch"><SearchBar /></div>
            <MessageBox />
        </div>

        <div class="inner-content page-content custom-scroll ptr-content" v-on:scroll="onHomeScrolling" @ptr:refresh="onPtr">
            
            <div class="ptr-preloader">
                <div class="preloader"></div>
                <div class="ptr-arrow"></div>
            </div>
            
            <BannerSwiper :banners="ad.banners" />

            <NewsCard ref="NewsCard"/>

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

            <block-headmore title="品牌專區" linkMore="/productbrand/" v-if="productBrands.length > 0">
                <div class="index-brands">
                    <table class="inner">
                        <tbody>
                            <tr v-for="(brands, idx) in productBrands" :key="idx">
                                <td v-for="brand in brands" :key="brand.id" class="brand">
                                    <ImageLink :image="brand.image" :link="`/productbrand/${brand.id}`"/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </block-headmore>

            <div class="recommand-products" v-if="isLogin">
                <block-headmore title="推薦商品" linkMore="/productevent/recommend" v-if="productTwoRecommends.length > 0">
                    <div class="products">
                        <ProductItem
                            v-for="(product, idx) in productTwoRecommends"
                            :id="product.id"
                            :key="idx"
                            :name="product.name"
                            :image="product.image"
                            :price="product.price" />
                    </div>
                </block-headmore>

                <block-headmore title="醫美儀器設備" linkMore="/productlistfilter/equipment" v-if="productTwoEquipment.length > 0">
                    <div class="products">
                        <ProductItem
                            v-for="(product, idx) in productTwoEquipment"
                            :id="product.id"
                            :key="idx"
                            :name="product.name"
                            :image="product.image"
                            :price="product.price" />
                    </div>
                </block-headmore>

                <block-headmore title="保養系列" linkMore="/productlistfilter/maintenance" v-if="productTwoMaintenance.length > 0">
                    <div class="products">
                        <ProductItem
                            v-for="(product, idx) in productTwoMaintenance"
                            :id="product.id"
                            :key="idx"
                            :name="product.name"
                            :image="product.image"
                            :price="product.price" />
                    </div>
                </block-headmore>

                <block-headmore title="醫美耗材" linkMore="/productlistfilter/consumable" v-if="productTwoConsumable.length > 0">
                    <div class="products">
                        <ProductItem
                            v-for="(product, idx) in productTwoConsumable"
                            :id="product.id"
                            :key="idx"
                            :name="product.name"
                            :image="product.image"
                            :price="product.price" />
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
            newsCardList: [],
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
                { image: 'static/images/banners/banner_01@3x.png', link:'/productevent/new' },
                { image: 'static/images/banners/banner_02@3x.png', link:'/productevent/discount' },
                { image: 'static/images/banners/banner_03@3x.png', link:'/productevent/primary' },
                { image: 'static/images/banners/banner_04@3x.png', link:'/productevent/event' },
                // { image: 'static/images/banners/banner_05@3x.png', link:'/productlistfilter/equipment' },
                // { image: 'static/images/banners/banner_06@3x.png', link:'/productlistfilter/second' },
            ],
        };
    },
    computed: {
        ...mapGetters(['isLogin']),
        ...mapState(['user', 'ad', 'product']),
        productBrands(self) {
            const list = [];
            const brands = self.product.brands;
            list.push(brands.slice(0, 3));
            if (brands.length >= 6) {
                list.push(brands.slice(3, 6));
            }
            return list;
        },
        productTwoRecommends(self) {
            const event = self.ad.events.find(e => e.key == 'recommend');
            return event
                ? self.product.list.filter(e => event.product_ids.includes(e.id)).slice(0, 2)
                : [];
        },
        productTwoEquipment(self) {
            const category = self.product.categories.find(e => e.key == 'equipment');
            return category
                ? self.product.list.filter(e => e.category_id == category.id).slice(0, 2)
                : [];
        },
        productTwoMaintenance(self) {
            const category = self.product.categories.find(e => e.key == 'maintenance');
            return category
                ? self.product.list.filter(e => e.category_id == category.id).slice(0, 2)
                : [];
        },
        productTwoConsumable(self) {
            const category = self.product.categories.find(e => e.key == 'consumable');
            return category
                ? self.product.list.filter(e => e.category_id == category.id).slice(0, 2)
                : [];
        },
    },
    mounted() {
        debug('mounted tab home', this);

        this.ad.banners.length === 0 && this.$store.dispatch('AD_FETCH_BANNERS');
        this.ad.events.length === 0 && this.$store.dispatch('AD_FETCH_EVENTS');
        
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
        onPtr(evt) {
            setTimeout(() => {
                window.location.reload();
            }, 500);
            
        }
    },
};

</script>
