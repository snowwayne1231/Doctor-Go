<template>
    <div class="tab-cart-content">
        <header-nav-bar>
            <i18n slot="title">購物車</i18n>
            <f7-link slot="right" @click="onClickClear"><i18n>清除</i18n></f7-link>
        </header-nav-bar>
        <div class="inner custom-scroll">
            <StatusDiv class="list">
                <li v-for="(data, idx) in cartOrders" :key="idx" class="list-item">
                    <a href="#" class="item-link item-content">
                        <div class="item-media">
                            <inputCheck v-model="data.selected" @input="onChangeItemCheck(data, idx)" />
                            <img class="image" @click="naviToProductById(data.product.id)" :src="data.product.image" />
                        </div>
                        <div class="item-inner">
                            <div class="item-title">
                                <div class="item-header" @click="naviToProductById(data.product.id)">{{data.product.name}}</div>
                                <div class="item-description custom-scroll">
                                    <cms-html :html="data.product.metaDescriptionHTML" />
                                </div>
                            </div>
                            <div class="item-after">
                                <num :price="data.product.price" class="inline-middle"></num>
                                <InputNumber v-model="data.amount" min="1" @input="onChangeItemAmount(data, idx)" />
                            </div>
                        </div>
                    </a>
                </li>
            </StatusDiv>
        </div>
        <div class="total">
            <div class="selector inline-middle">
                <inputCheck :value="isTotalSelected" @click.native="selectAll"/>
                <i18n>全選</i18n>
            </div>
            <div class="prices">
                <div class="price"><i18n>合計</i18n>:<num :price="totalPrice" /></div>
                <div class="redeem"><i18n>商品最高可抵</i18n>:<num :price="totalCanBeDiscount" /></div>
            </div>
            <btn @click="onClickGoToCheckout">
                <i18n>結算</i18n><span>({{countSelected}})</span>
            </btn>
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
        ...mapState(['cart', 'product']),
        cartOrders(self) {
            return self.cart.list.map(e => {
                const product = self.product.list.find(p => p.id == e.product) || {};
                return {...e, product};
            });
        },
        isTotalSelected() {
            return this.cartOrders.findIndex(e => !e.selected) === -1;
        },
        countSelected() {
            return this.cartOrders.filter(e => e.selected).length;
        },
        totalPrice() {
            // debug(this.cartOrders);
            return this.cartOrders.length > 0
                ? this.cartOrders.filter(e => e.selected).reduce((a, b) => a + (b.product.price * b.amount), 0)
                : 0;
        },
        totalCanBeDiscount() {
            return this.cartOrders
                .map(e => e.product.point_can_be_discount
                    ? e.product.point_can_be_discount * e.amount
                    : 0)
                .reduce((a, b) => { return a + b }, 0);
        },
    },
    mounted() {
        debug('mounted tab cart', this);
    },
    destroyed() {
        this.$store.dispatch('CART_SAVE');
    },
    methods: {
        selectAll() {
            // debug(this.cartData);
            this.$store.commit({
                type: 'CART_SELECT_ALL',
            });
        },
        onChangeItemCheck(data, idx) {
            this.$store.commit({
                type: 'CART_TOGGLE_SELECTED',
                idx,
            });
        },
        onChangeItemAmount(data, idx) {
            this.$store.commit({
                type: 'CART_UPDATE_AMOUNT',
                idx,
                amount: data.amount,
            })
        },
        onClickGoToCheckout() {
            if (this.cartOrders.length === 0) {
                return window.f7alert('購物車為空');
            }

            this.$store.dispatch('CART_SAVE').then(e => {
                this.$f7router.navigate('/checkout/');
            })
        },
        onClickClear() {
            this.$f7.dialog.confirm('確定刪除選擇的商品嗎?', '購物車編輯', (evt) => {
                this.$store.commit('CART_REMOVE_LIST_ITEM');
            });
        },
        naviToProductById(id) {
            this.$f7router.navigate(`/product/${id}`);
        },
    },
};

</script>
