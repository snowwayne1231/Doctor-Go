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

        <f7-tabs animated routable>

            <!-- <f7-tab id="my-order-before-pay">
                <OrderCollapse :orders="beforePayOrders"/>
            </f7-tab>

            <f7-tab id="my-order-before-ship">
                <OrderCollapse :orders="beforeShipOrders"/>
            </f7-tab> -->


            <f7-tab id="my-order-wait">
                <div class="order-tab-title"><i18n>洽詢處理中訂單</i18n></div>
                <OrderCollapse :orders="waittingOrders" :loading="loading" />
            </f7-tab>

            <f7-tab id="my-order-finish">
                <div class="order-tab-title"><i18n>完成訂單</i18n></div>
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
                beforePayOrders: [],
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
                        uri: 'authorization/get/PaymentOrder,products/all',
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
                        total_net: e.total_net,
                        products: e.products.map(ele => {
                            const productInfo = productList.find(pd => pd.id == ele.product_id) || {};
                            return {
                                id: ele.id,
                                image: productInfo.image,
                                name: productInfo.name,
                                amount: ele.quantity,
                                total: ele.total,
                                total_net: ele.total_net,
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