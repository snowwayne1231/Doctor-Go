<template>
    <div class="tab-cart-content">
        <header-nav-bar>
            <i18n slot="title">購物車</i18n>
            <f7-link slot="right"><i18n>編輯</i18n></f7-link>
        </header-nav-bar>
        <div class="inner">
            <div class="list">
                <li v-for="data in cartOrders" :key="data.id" class="list-item">
                    <a href="#" class="item-link item-content">
                        <div class="item-media">
                            <inputCheck v-model="data.selected" @input="onChangeItemCheck(data)" />
                            <img class="image" :src="data.productData.image" />
                        </div>
                        <div class="item-inner">
                            <div class="item-title">
                                <div class="item-header">{{data.productData.name}}</div>
                                <div class="item-description">{{data.productData.description}}</div>
                            </div>
                            <div class="item-after">
                                <num isPrice class="inline-middle">{{data.productData.price}} </num>
                                <InputNumber v-model="data.amount" min="1" @input="onChangeItemAmount(data)" />
                            </div>
                        </div>
                    </a>
                </li>
            </div>
        </div>
        <div class="total">
            <div class="selector inline-middle">
                <inputCheck :value="isTotalSelected" @click.native="selectAll"/>
                <i18n>全選</i18n>
            </div>
            <div class="prices">
                <div class="price"><i18n>合計</i18n>:<num :price="totalPrice" /></div>
                <div><i18n>不含運費</i18n></div>
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
            cartData: [
                { id: 1, selected: true, amount: 1, title: '產品A', price: 7520, image: 'static/images/products/el-200x170.png', description: '11cc' },
                { id: 2, selected: true, amount: 2, title: '產品B', price: 5520, image: 'static/images/products/el-200x170.png', description: '321mod' },
                { id: 3, selected: true, amount: 1, title: '產品C', price: 6820, image: 'static/images/products/el-200x170.png', description: 'qq.c.' },
                { id: 4, selected: true, amount: 2, title: '產品D', price: 9999, image: 'static/images/products/el-200x170.png', description: 'wwww' },
                { id: 5, selected: true, amount: 3, title: '產品E', price: 1000, image: 'static/images/products/el-200x170.png', description: 'uouo' },
            ],
        }
    },
    computed: {
        ...mapState(['cart', 'product']),
        cartOrders(self) {
            return self.cart.orders.map(e => {
                const product = self.product.summarylist.find(p => p.id == e.product);
                return {...e, productData: product};
            });
        },
        isTotalSelected() {
            return this.cartOrders.findIndex(e => !e.selected) === -1;
        },
        countSelected() {
            return this.cartOrders.filter(e => e.selected).length;
        },
        totalPrice() {
            // debug(this.cartData.filter(e => e.selected));
            return this.cartOrders.filter(e => e.selected).reduce((a, b) => a + (b.productData.price * b.amount), 0);
        },
    },
    mounted() {
        debug('mounted tab cart');
    },
    methods: {
        selectAll() {
            // debug(this.cartData);
            this.$store.commit({
                type: 'CART_SELECT_ALL',
            });
        },
        onChangeItemCheck(data) {
            this.$store.commit({
                type: 'CART_TOGGLE_SELECTED',
                id: data.id,
            });
        },
        onChangeItemAmount(data) {
            this.$store.commit({
                type: 'CART_UPDATE_AMOUNT',
                id: data.id,
                amount: data.amount,
            })
        },
        onClickGoToCheckout() {
            this.$f7router.navigate('/checkout/');
        },
    },
};

</script>
