<template>
    <f7-page id="my-order">
        <header-nav-bar back>
            <nav slot="title" class="my-order-nav">
                <!-- <f7-link tab-link="#my-order-before-pay">
                    <i18n>待付款</i18n>
                </f7-link><f7-link tab-link="#my-order-before-ship">
                    <i18n>待發貨</i18n>
                </f7-link> --><f7-link tab-link="#my-order-wait">
                    <i18n>待洽詢</i18n>
                </f7-link><f7-link tab-link="#my-order-finish">
                    <i18n>已完成</i18n>
                </f7-link>
            </nav>
        </header-nav-bar>

        <f7-tabs animated routable swipeable>

            <!-- <f7-tab id="my-order-before-pay">
                <OrderCollapse :orders="beforePayOrders"/>
            </f7-tab>

            <f7-tab id="my-order-before-ship">
                <OrderCollapse :orders="beforeShipOrders"/>
            </f7-tab> -->


            <f7-tab id="my-order-wait">
                <OrderCollapse :orders="waittingOrders" :loading="loading" />
            </f7-tab>

            <f7-tab id="my-order-finish">
                <OrderCollapse :orders="finishOrders" :loading="loading" />
            </f7-tab>

        </f7-tabs>
    </f7-page>
</template>


<script>
    import { mapState, mapActions } from 'vuex';
    import axios from 'assets/js/utils/axios';
    

    export default {
		data () {
			return {
                loading: true,
                maxShowOrder: 10,
                beforePayOrders: [
                    // { id: 123456, status: 1, date: '2019-01-05 19:12', total: 15000, products: [
                    //     { id: 1, name: 'Ellanse SXT', price: 7500, amount: 1, image: 'static/images/products/el-650x650.png' },
                    //     { id: 2, name: 'Ellanse SXT', price: 7500, amount: 1, image: 'static/images/products/el-650x650.png' },
                    // ]},
                    // { id: 1234598, status: 1, date: '2019-01-05 19:15', total: 22500, products: [
                    //     { id: 4, name: 'Ellanse SXT', price: 7500, amount: 1, image: 'static/images/products/el-650x650.png' },
                    //     { id: 5, name: 'Ellanse SXT', price: 7500, amount: 1, image: 'static/images/products/el-650x650.png' },
                    //     { id: 6, name: 'Ellanse SXT', price: 7500, amount: 1, image: 'static/images/products/el-650x650.png' },
                    // ]},
                    // { id: 1234599, status: 1, date: '2019-01-05 19:18', total: 30000, products: [
                    //     { id: 4, name: 'Ellanse SXT', price: 7500, amount: 1, image: 'static/images/products/el-650x650.png' },
                    //     { id: 5, name: 'Ellanse SXT', price: 7500, amount: 1, image: 'static/images/products/el-650x650.png' },
                    //     { id: 6, name: 'Ellanse SXT', price: 7500, amount: 1, image: 'static/images/products/el-650x650.png' },
                    //     { id: 7, name: 'Ellanse SXT', price: 7500, amount: 1, image: 'static/images/products/el-650x650.png' },
                    // ]},
                ],
                beforeShipOrders: [],
                waittingOrders: [],
                finishOrders: [],
			};
        },
        computed: {
            ...mapState(['product']),
        },
        mounted() {
            debug('my-order page', this);
            this.init();
            // this.$f7.tab.show('#my-order-overview');
        },
        methods: {
            init() {
                const promise = this.$store.dispatch('PRODUCT_CHECK_LIST');
                promise.then(e => {
                    axios({
                        uri: 'authorization/get/paymentOrder,products/all',
                        success: (data) => {
                            this.loading = false;

                            const nextWattingOrders = this.parseOrders(data.filter(e => e.status == 1));

                            const nextFinishOrders = this.parseOrders(data.filter(e => e.status == 5));

                            this.waittingOrders = nextWattingOrders;
                            this.finishOrders = nextFinishOrders;
                            // debug('myorder', nextWattingOrders);
                        },
                    });
                });
            },
            parseOrders(data) {
                const productList = this.product.list;
                // debug('productList', productList);
                return data.map(e => {
                    return {
                        id: e.id,
                        status: e.status,
                        date: e.created_at,
                        total: e.total,
                        products: e.products.map(ele => {
                            const productInfo = productList.find(pd => pd.id == ele.product_id) || {};
                            return {
                                id: ele.id,
                                image: productInfo.image,
                                name: productInfo.name,
                                amount: ele.quantity,
                                total: ele.total,
                            };
                        }),
                    };
                }).sort((a, b) => {
                    return b.id - a.id;
                }).slice(0, this.maxShowOrder);
            },
        },
    };
</script>