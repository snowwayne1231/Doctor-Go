<template>
    <f7-page id="collective-buying-single">
        <header-nav-bar back>
            <i18n slot="title" :text="title"></i18n>
        </header-nav-bar>

        <div class="inner-content">
            <div class="details" v-if="detail && detail.product">
                <table-list>
                    <tr>
                        <td colspan="2">
                            <!-- <ImageLink class="product-image" :image="detail.product.image" /> -->
                            <f7-swiper v-if="detail.product.image_detail" class="product-images" pagination>
                                <f7-swiper-slide class="swiper-slide-item" v-for="(image, idx) in detail.product.image_detail" :key="idx">
                                    <img class="img" :src="image" />
                                </f7-swiper-slide>
                            </f7-swiper>
                        </td>
                    </tr>
                    <tr>
                        <td><i18n>產品名稱</i18n></td>
                        <td @click="onClickProduct(detail.product)">{{detail.product.name}}</td>
                    </tr>
                    <tr>
                        <td><i18n>當前價格</i18n></td>
                        <td>
                            <num class="price" :price="detail.now_price" />
                            <span v-if="!detail.now_discount">(尚未達到優惠人數)</span>
                        </td>
                    </tr>
                    <tr>
                        <td><i18n>團購優惠</i18n></td>
                        <td>
                            <div class="price-bar">
                                <i v-for="(dis, idx) in detail.discount_json" :key="idx" class="gap" 
                                    :style="{
                                        width: Math.round(100 * (detail.discount_json[idx +1] ? dis.condition_quantity - detail.discount_json[idx +1].condition_quantity : dis.condition_quantity) / max_quantity) + '%',
                                        'background-color': `rgb(${Math.floor(idx * (100 / detail.discount_json.length) +150)}, 250, 160)`,
                                    }">
                                    <num :price="dis.price" />
                                    <num class="condition" :value="dis.condition_quantity"></num>
                                </i>
                                <dd class="overlay" :style="{width: `${detail.sum_quantity / max_quantity * 100}%`}" />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td><i18n>團購人數</i18n></td>
                        <td><num :value="detail.sum_quantity"></num></td>
                    </tr>
                    <tr>
                        <td><i18n>起始日期</i18n></td>
                        <td><DateTime :value="detail.time_start"/></td>
                    </tr>
                    <tr>
                        <td><i18n>結束日期</i18n></td>
                        <td><DateTime :value="detail.time_end"/></td>
                    </tr>
                    
                    <!-- <tr>
                        <td class="list-left"><i18n>點數可折抵</i18n></td>
                        <td><num :price="detail.product.point_can_be_discount"></num></td>
                    </tr>
                    <tr>
                        <td class="list-left"><i18n>購買獲得紅利</i18n></td>
                        <td><num :price="detail.product.point_reward"></num></td>
                    </tr> -->
                    <tr v-if="detail.product.descriptionHTML">
                        <td colspan="2">
                            <cms-html :html="detail.product.descriptionHTML" />
                        </td>
                    </tr>
                </table-list>
            </div>

            <div class="no-group" v-else>
                <i18n>沒有此團購項目</i18n>
            </div>
        </div>
        <fixed-button :show="true" @click="onClickJoin">
            加入團購
        </fixed-button>
    </f7-page>
</template>


<script>
    import { mapState, mapGetters } from 'vuex';

    export default {
		data () {
			return {
                title: '團購產品',
                id: 2,
                promoterId: 2,
                promoterName: '孫升升',
                promoterImage: 'static/images/face.png',
                productId: 12,
                productName: '水龍捲皮膚氫淨機',
                productImage: 'static/images/products/el-650x650.png',
                startDate: '2019-03-04',
                endDate: '2019-03-15',
                participant: [
                    { id: 1, name: '小朋友', image: 'static/images/face.png', }
                ],
			};
        },
        computed: {
            ...mapState(['product', 'groupBuying']),
            ...mapGetters(['groupBuyingList']),
            detail() {
                return this.groupBuyingList.find(e => e.id == this.$f7route.params.id);
            },
            max_quantity() {
                return this.detail ? this.detail.discount_json[0].condition_quantity : 0;
            },
        },
        mounted() {
            this.$store.dispatch('PRODUCT_CHECK_LIST');
            this.$store.dispatch('GROUPBUYING_CHECK_LIST');
            debug(this);
        },
		methods: {
			onClickProduct(product) {
                this.$f7router.navigate(`/product/${product.id}`);
            },
            onClickJoin() {
                const self = this;
                window.f7prompt('請輸入要購買的數量', (value) => {
                    
                    const number = parseInt(value, 10);

                    if (number > 0) {
                        self.$store.dispatch('GROUPBUYING_BUY', {
                            id: parseInt(self.$f7route.params.id, 10),
                            quantity: number,
                        });
                    }

                });
            },
		},
    };
</script>