<template>
    <f7-page id="product">
        <header-nav-bar back>
            <nav slot="title" class="product-nav">
                <f7-link tab-link="#product-overview" tab-link-active>
                    <i18n>商品</i18n>
                </f7-link>
                <f7-link tab-link="#product-detail">
                    <i18n>詳情</i18n>
                </f7-link>
                <!-- <f7-link tab-link="#product-comment">
                    <i18n>評價</i18n>
                </f7-link> -->
            </nav>
        </header-nav-bar>
        
        <f7-tabs swipeable>

            <f7-tab id="product-overview" tab-active>
                <div class="product-overview-inner" v-if="thisProduct">
                    <f7-swiper v-if="thisProduct" class="product-images" pagination>
                        <f7-swiper-slide class="swiper-slide-item" v-for="(image, idx) in thisProduct.image_detail" :key="idx">
                            <img class="img" :src="image" />
                        </f7-swiper-slide>
                    </f7-swiper>
                    <section class="info">
                        <div class="name">{{thisProduct.name}}</div>
                        <div class="prices">
                            <dd class="price" v-if="thisProduct.price_forshow">
                                <i18n>原價</i18n><num :price="thisProduct.price_forshow"></num>
                            </dd>
                            <dd class="special-price">
                                <i18n>優惠價</i18n><num :price="thisProduct.price"></num>
                            </dd>
                        </div>
                    </section>
                    <section class="operation">
                        <btn right-arrow raised @click="sheetOpened = true">選擇規格型號</btn>
                        
                        <!-- <btn right-arrow @click="goToComment">
                            <dd class="left">
                                <StarRanking :score="4.6" />
                            </dd>
                            <dd class="right">
                                {{comments.count}}
                                <i18n>條評價</i18n>
                            </dd>
                        </btn> -->

                    </section>
                    <section class="review" v-if="thisProduct">
                        <cms-html :html="thisProduct.metaDescriptionHTML">
                            
                        </cms-html>
                    </section>
                </div>
                
                <section class="product cart-btns">
                    <dd class="adds icon inline-middle" @click="onClickAddFavorite">
                        <f7-icon class="fa" :class="{ 'fa-heart': isWatched, 'fa-heart-o': !isWatched }" />
                    </dd><dd class="adds icon inline-middle" @click="onClickNavigateToCart">
                        <f7-icon class="fa fa-shopping-cart" />
                    </dd>
                    <btn class="adds cart" @click="onClickAddToCart">
                        <i18n>加入購物車</i18n>
                    </btn><btn class="adds buy" @click="onClickBuy">
                        <i18n>立即購買</i18n>
                    </btn>
                </section>

            </f7-tab>


            <f7-tab id="product-detail">
                <table-list v-if="thisProduct">
                    <tr>
                        <td class="list-left"><i18n>商品名</i18n></td>
                        <td>{{thisProduct.name}}</td>
                    </tr>
                    <tr>
                        <td class="list-left"><i18n>品牌</i18n></td>
                        <td>{{brand.name}}</td>
                    </tr>
                    <tr>
                        <td class="list-left"><i18n>庫存</i18n></td>
                        <td><num :value="thisProduct.quantity"></num></td>
                    </tr>
                    <tr>
                        <td class="list-left"><i18n>點數可折抵</i18n></td>
                        <td><num :price="thisProduct.point_can_be_discount"></num></td>
                    </tr>
                    <tr>
                        <td class="list-left"><i18n>購買獲得紅利</i18n></td>
                        <td><num :price="thisProduct.point"></num></td>
                    </tr>
                    <tr v-for="(detail, idx) in thisProduct.details" :key="idx">
                        <td class="list-left">{{detail[0]}}</td>
                        <td>{{detail[1]}}</td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <cms-html :html="thisProduct.descriptionHTML" />
                        </td>
                    </tr>
                </table-list>
            </f7-tab>


            <!-- <f7-tab id="product-comment">
                <table-list>
                    <tr>
                        <td>
                            <i18n>商品總評價:</i18n><StarRanking :score="4.6" />
                        </td>
                    </tr>
                </table-list>
                <f7-list media-list>
                    <li class="media-item" v-for="data in comments.data" :key="data.id">
                        <div class="item-content">
                            <div class="item-media">
                                <img :src="data.image">
                            </div>
                            <div class="item-inner">
                                <div class="item-title-row">
                                    <div class="item-title">{{data.title}}</div>
                                    <div class="item-after">
                                        <span>{{data.date}}</span>
                                    </div>
                                </div>
                                <div class="item-subtitle">
                                    <StarRanking :score="data.score" :hideNumber="true" />
                                </div>
                                <div class="item-text">{{data.text}}</div>
                            </div>
                        </div>
                    </li>
                </f7-list>
            </f7-tab> -->
        </f7-tabs>

        <f7-sheet class="sheet" :opened="sheetOpened" @sheet:closed="sheetOpened = false">
            <div class="product product-specification" v-if="thisProduct">
                <f7-row>
                    <f7-col class="product-name cart-col">
                        {{thisProduct.name}}
                    </f7-col>
                </f7-row>
                <f7-row>
                    <f7-col class="product-price cart-col">
                        <num :price="thisProduct.price"></num>
                    </f7-col>
                </f7-row>
                <f7-row>
                    <f7-col width="30" class="cart-col">
                        <i18n>數量</i18n>
                    </f7-col>
                    <f7-col width="70" class="cart-col">
                        <InputNumber class="amount" v-model="amount"/>
                    </f7-col>
                </f7-row>
            </div>
            <div class="product cart-btns">
                <btn class="adds cart" @click="onClickAddToCart">
                    <i18n>加入購物車</i18n>
                </btn><btn class="adds buy" @click="onClickBuy">
                    <i18n>立即購買</i18n>
                </btn>
            </div>
        </f7-sheet>

        <div class="modal-shadow" :class="{show: sheetOpened}" @click="closeSheet" />
        
    </f7-page>
</template>


<script>
    import { mapState, mapActions } from 'vuex';
    import axios from 'assets/js/utils/axios';

    export default {
		data () {
			return {
                comments: {
                    count: 1314,
                    data: [
                        { id: 1, title: 'Yellow Submarine', score: 5, text: 'that is good', date: '2019-02-02', image: 'http://lorempixel.com/160/160/people/1'},
                        { id: 2, title: 'Yellow Submarine', score: 4.5, text: 'that is good', date: '2019-02-02', image: 'http://lorempixel.com/160/160/people/2'},
                        { id: 3, title: 'Yellow Submarine', score: 4.2, text: 'that is good', date: '2019-02-02', image: 'http://lorempixel.com/160/160/people/3'},
                    ],
                },
                sheetOpened: false,
                amount: 1,
                // hideTabs: false,
			};
        },
        computed: {
            ...mapState(['product', 'user']),
            id() {
                return this.$f7route.params.productId;
            },
            thisProduct() {
                return this.product.list.find(e => e.id == this.id);
            },
            brand() {
                return this.product.brands.find(e => e.id === this.thisProduct.brand_id) || {};
            },
            isWatched() {
                return this.user.watchlist_products.findIndex(e => e.product_id == this.id) >= 0;
            },
        },
        mounted() {
            debug('product page', this);
            this.$store.dispatch('PRODUCT_FETCH_DATA_BY_ID', this.id);
            this.$f7.tab.show('#product-overview');
            // this.hideTabs = false;
        },
        methods: {
            closeSheet() {
                // debug(this);
                this.$f7.sheet.close();
            },
            goToComment() {
                this.$f7.tab.show('#product-comment');
            },
            onClickAddToCart() {
                this.closeSheet();
                this.$store.dispatch('CART_ADD', {
                    product: this.id,
                    amount: this.amount,
                }).then(e => {
                    window.f7alert('已成功加入購物車');
                });

            },
            onClickBuy() {
                this.closeSheet();
                this.$store.dispatch('CART_ADD', {
                    product: this.id,
                    amount: this.amount,
                });
                
                this.$f7router.navigate('/tab-cart');
            },
            onClickAddFavorite() {
                if (this.isWatched) {
                    const promise = this.$store.dispatch('USER_REMOVE_WATCHLIST_PRODUCT', this.id);
                    promise.then(function(){
                        window.f7alert('已移除收藏');
                    });
                } else {
                    const promise = this.$store.dispatch('USER_STORE_WATCHLIST_PRODUCT', this.id);
                    promise.then(function(){
                        window.f7alert('已成功將商品加入我的商品收藏');
                    });
                }
            },
            onClickNavigateToCart() {
                this.$f7router.navigate('/tab-cart');
            },
        },
        beforeDestroy () {
            this.closeSheet();
        },
    };
</script>