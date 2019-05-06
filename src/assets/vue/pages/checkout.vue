<template>
    <f7-page id="checkout">
        <header-nav-bar back>
            <i18n slot="title">
                結帳
            </i18n>
        </header-nav-bar>

        <div class="inner-content">
            <table-list class="my-point">
                <tr>
                    <th width="50%"><i18n>我的點數</i18n></th>
                    <th width="50%"><i18n>商品折抵點數消費</i18n></th>
                </tr>
                <tr>
                    <td><num :value="user.point" /></td>
                    <td><num :value="totalDiscount" /></td>
                </tr>
            </table-list>

            <table-list>
                <tr>
                    <th width="40%"><i18n>商品</i18n></th>
                    <th width="30%"><i18n>價格</i18n></th>
                    <th width="15%"><i18n>數量</i18n></th>
                    <th width="15%"><i18n>折抵</i18n></th>
                </tr>
                <tr v-for="(data, idx) in cartOrders" :key="idx">
                    <td class="product">
                        {{data.product.name}}
                    </td>
                    <td class="price">
                        <num v-if="!!data.redeem" class="discount" :price="data.product.price - data.product.point_can_be_discount" />
                        <num v-else :price="data.product.price" />
                    </td>
                    <td class="amount">
                        <num>{{data.amount}}</num>
                    </td>
                    <td>
                        <inputCheck
                            v-if="data.product.point_can_be_discount > 0"
                            :value="!!data.redeem" 
                            @input="onChangeRedeem(data, idx)"
                        />
                    </td>
                </tr>
                <tr v-if="matchedPromotions.length > 0" class="promotion-h">
                    <th>優惠活動</th>
                    <th>消費額</th>
                    <th>可折抵</th>
                    <th>折抵</th>
                </tr>
                <tr v-for="(promo, idx) in matchedPromotions" :key="String(promo.id) + idx" class="promotion">
                    <td>{{promo.name}}</td>
                    <td><num :price="promo.condition" /></td>
                    <td><num :price="promo.redeem_point" /></td>
                    <td>
                        <inputCheck 
                            :value="promo.selected" 
                            @input="onChangePromotionRedeem(promo, idx)"
                        />
                    </td>
                </tr>
                <tr class="result-h">
                    <th></th>
                    <th colspan="3"><i18n>總計</i18n></th>
                </tr>
                <tr class="result">
                    <td></td>
                    <td colspan="3">
                        <num class="total" :price="finalPrice" />
                    </td>
                </tr>
            </table-list>
        </div>
        <fixed-button @click="onClickCheckout" :loading="axios.isLoading" :show="true">
            <i18n>結帳</i18n>
        </fixed-button>
    </f7-page>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    import axios from 'assets/js/utils/axios';
    

    export default {
		data () {
			return {
                
			};
        },
        computed: {
            ...mapState(['cart', 'product', 'user', 'axios']),
            cartOrders(self) {
                // debug('cartOrders', self.cart.list);
                return self.cart.list
                .filter(e => e.selected)
                .map(e => {
                    const product = self.product.list.find(p => p.id == e.product) || {};
                    return {...e, product};
                });
            },
            totalDiscount() {
                const generalDiscount = this.cartOrders
                    .map(e => e.redeem
                        ? e.redeem * e.product.point_can_be_discount
                        : 0)
                    .reduce((a, b) => { return a + b }, 0);
                const promotionDiscount = this.cart.promotions
                    .filter(e => e.selected)
                    .reduce((a, b) => {
                        return a + b.redeem_point;
                    }, 0);
                return generalDiscount + promotionDiscount;
            },
            totalPrice() {
                return this.cartOrders.length > 0
                    ? this.cartOrders.filter(e => e.selected).reduce((a, b) => a + (b.product.price * b.amount), 0)
                    : 0;
            },
            matchedPromotions() {
                return this.cart.promotions.filter(e => e.condition <= this.totalPrice);
            },
            finalPrice() {
                return this.totalPrice - this.totalDiscount;
            },
        },
        mounted() {
            this.$store.dispatch('PRODUCT_FETCH_LIST').then(() => {
                this.fetchPromotions();
            });
        },
        methods: {
            onClickCheckout() {
                if (this.axios.isLoading) {
                    return window.f7alert('資料讀取中 請勿操作');
                }

                const overQuantity = this.cartOrders.find(e => e.amount > e.product.quantity);

                if (overQuantity) {
                    return window.f7alert(`${overQuantity.product.name} 存貨不足`);
                }

                if (this.finalPrice <= 0) {
                    return window.f7alert('錯誤的價格');
                }

                if (this.totalDiscount > this.user.point ) {
                    return window.f7alert('可用點數不足');
                }

                this.$store.dispatch('CART_CHECKOUT').then(() => {
                    window.f7alert('已收到您的結帳申請，請耐心等候我們會有專員聯絡您', () => {
                        this.$f7router.navigate('/tab-my');
                    });
                });
            },
            onChangeRedeem(data, idx) {
                this.$store.commit('CART_TOGGLE_REDEEM', {
                    idx,
                    amount: data.amount,
                });
            },
            onChangePromotionRedeem(data, idx) {
                this.$store.commit('CART_TOGGLE_REDEEM_PROMOTION', {
                    idx,
                });
            },
            fetchPromotions() {
                this.$store.dispatch('CART_FETCH_PROMOTIONS');
            },
        },
    };
</script>