<template>
    <f7-page id="checkout">
        <header-nav-bar back>
            <i18n slot="title">
                結帳
            </i18n>
        </header-nav-bar>

        <div class="inner-content">
            <table-list>
                <tr>
                    <th width="60%"><i18n>商品</i18n></th>
                    <th width="20%"><i18n>價格</i18n></th>
                    <th><i18n>數量</i18n></th>
                </tr>
                <tr v-for="data in cartOrders" :key="data.id">
                    <td class="product">
                        {{data.productData.name}}
                    </td>
                    <td class="price">
                        <num :price="data.productData.price" />
                    </td>
                    <td class="amount">
                        <num>{{data.amount}}</num>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td colspan="2"><i18n>總計</i18n></td>
                </tr>
                <tr>
                    <td></td>
                    <td colspan="2">
                        <num class="total" :price="totalPrice" />
                    </td>
                </tr>
            </table-list>
            
            
        </div>
        <fixed-button @click="onCluickCheckout">
            結帳
        </fixed-button>
    </f7-page>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    

    export default {
		data () {
			return {
                
			};
        },
        computed: {
            ...mapState(['cart', 'product']),
            cartOrders(self) {
                return self.cart.orders.map(e => {
                    const product = self.product.summarylist.find(p => p.id == e.product);
                    return {...e, productData: product};
                });
            },
            totalPrice() {
                return this.cartOrders.filter(e => e.selected).reduce((a, b) => a + (b.productData.price * b.amount), 0);
            },
        },
        mounted() {
            
        },
        methods: {
            onCluickCheckout() {
                this.$f7.dialog.alert('已收到您的結帳申請，請耐心等候我們會有專員聯絡您', '系統提示');
            },
        },
    };
</script>