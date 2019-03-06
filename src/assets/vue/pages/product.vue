<template>
    <f7-page id="product">
        <header-nav-bar back>
            <nav slot="title" class="product-nav">
                <f7-link tab-link="#product-overview">
                    <i18n>商品</i18n>
                </f7-link>
                <f7-link tab-link="#product-detail">
                    <i18n>詳情</i18n>
                </f7-link>
                <f7-link tab-link="#product-comment">
                    <i18n>評價</i18n>
                </f7-link>
            </nav>
        </header-nav-bar>
        
        <f7-tabs swipeable v-if="!hideTabs">

            <f7-tab id="product-overview">
                <f7-swiper class="product-images" pagination>
                    <f7-swiper-slide><img src="static/images/products/el-650x650.png" /></f7-swiper-slide>
                    <f7-swiper-slide><img src="static/images/products/el-650x650.png" /></f7-swiper-slide>
                    <f7-swiper-slide><img src="static/images/products/el-650x650.png" /></f7-swiper-slide>
                </f7-swiper>
                <section class="info">
                    <div class="name">Ellanse S</div>
                    <div class="prices">
                        <dd class="price">
                            <i18n>原價</i18n><num isPrice>8500</num>
                        </dd>
                        <dd class="special-price">
                            <i18n>優惠價</i18n><num isPrice>7500</num>
                        </dd>
                    </div>
                </section>
                <section class="operation">
                    <btn right-arrow raised @click="sheetOpened = true">選擇規格型號</btn>
                    
                    <btn right-arrow @click="goToComment">
                        <dd class="left">
                            <StarRanking :score="4.6" />
                        </dd>
                        <dd class="right">
                            {{comments.count}}
                            <i18n>條評價</i18n>
                        </dd>
                    </btn>
                </section>
                <section class="review">
                    <cms-html>
                        <p>功效:恢復20歲凍齡肌膚</p>
                        <p>全天然草本 說明....說明說明說明說明說明說明說明說明說明說明說明說明說明</p>
                        <p>明說明說明說明說明說明說明</p>
                    </cms-html>
                </section>

                <section class="product cart-btns">
                    <dd class="adds icon inline-middle" @click="onClickAddFavorite">
                        <f7-icon class="fa fa-heart-o" />
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
                <table-list>
                    <tr>
                        <td class="list-left"><i18n>品名</i18n></td>
                        <td>Ellanse S</td>
                    </tr>
                    <tr>
                        <td class="list-left"><i18n>品牌</i18n></td>
                        <td>Honda</td>
                    </tr>
                    <tr>
                        <td class="list-left"><i18n>規格</i18n></td>
                        <td>TVV-Ti Vsss</td>
                    </tr>
                    <tr>
                        <td class="list-left"><i18n>庫存</i18n></td>
                        <td><num>98774</num></td>
                    </tr>
                    <tr>
                        <td class="list-left"><i18n>單位</i18n></td>
                        <td>瓶</td>
                    </tr>
                    <tr>
                        <td class="list-left"><i18n>包裝</i18n></td>
                        <td>鈦合金</td>
                    </tr>
                    <tr>
                        <td class="list-left"><i18n>生產企業名</i18n></td>
                        <td>桃園幼幼幼國際股份有限公司</td>
                    </tr>
                    <tr>
                        <td class="list-left"><i18n>證號</i18n></td>
                        <td>準字 3165第89754-65213-5464657</td>
                    </tr>
                    <tr>
                        <td class="list-left"><i18n>註冊有效日期</i18n></td>
                        <td>2019-02-02</td>
                    </tr>
                    <tr>
                        <td class="list-left"><i18n>其他</i18n></td>
                        <td>保值10年;</td>
                    </tr>
                </table-list>
            </f7-tab>


            <f7-tab id="product-comment">
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
            </f7-tab>
        </f7-tabs>

        <f7-sheet class="sheet" :opened="sheetOpened" @sheet:closed="sheetOpened = false">
            <div class="product product-specification">
                <f7-row>
                    <f7-col class="product-name cart-col">
                        Ellanse S QQQ 特別版
                    </f7-col>
                </f7-row>
                <f7-row>
                    <f7-col class="product-price cart-col">
                        <num isPrice>7500</num>
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
                hideTabs: false,
			};
        },
        computed: {
            ...mapState(['product']),
            thisProduct() {
                return this.product.summarylist.find(e => e.id == 1);
            },
            isCurrent() {
                return this.$f7router.currentPageEl === this.$el;
            },
        },
        mounted() {
            debug('product page', this);
            this.$f7.tab.show('#product-overview');
            this.hideTabs = false;
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
                this.$f7.dialog.alert('已成功加入購物車', '系統提示');
            },
            onClickBuy() {
                this.closeSheet();
                this.hideTabs = true;
                this.$destroy();
                
                this.$f7router.navigate('/tab-cart');
            },
            onClickAddFavorite() {
                this.$f7.dialog.alert('已成功將商品加入我的商品收藏', '系統提示');
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