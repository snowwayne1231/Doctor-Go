<template>
    <f7-page id="my-order">
        <header-nav-bar back>
            <nav slot="title" class="my-order-nav">
                <f7-link tab-link="#my-order-before-pay">
                    <i18n>待付款</i18n>
                </f7-link><f7-link tab-link="#my-order-before-ship">
                    <i18n>待發貨</i18n>
                </f7-link><f7-link tab-link="#my-order-wait">
                    <i18n>待收貨</i18n>
                </f7-link><f7-link tab-link="#my-order-finish">
                    <i18n>已完成</i18n>
                </f7-link>
            </nav>
        </header-nav-bar>

        <f7-tabs animated routable swipeable>

            <f7-tab id="my-order-before-pay">
                <OrderCollapse :orders="beforePayOrders"/>
            </f7-tab>

            <f7-tab id="my-order-before-ship">
                <OrderCollapse :orders="beforeShipOrders"/>
            </f7-tab>


            <f7-tab id="my-order-wait">
                <OrderCollapse :orders="waittingOrders"/>
            </f7-tab>

            <f7-tab id="my-order-finish">
                <OrderCollapse :orders="finishOrders"/>
            </f7-tab>

        </f7-tabs>
    </f7-page>
</template>


<script>
    import { mapState, mapActions } from 'vuex';
    

    export default {
		data () {
			return {
                beforePayOrders: [
                    { id: 123456, status: 1, date: '2019-01-05 19:12', total: 15000, products: [
                        { id: 1, name: 'Ellanse SXT', price: 7500, amount: 1, image: 'static/images/products/el-650x650.png' },
                        { id: 2, name: 'Ellanse SXT', price: 7500, amount: 1, image: 'static/images/products/el-650x650.png' },
                    ]},
                    { id: 1234598, status: 1, date: '2019-01-05 19:15', total: 22500, products: [
                        { id: 4, name: 'Ellanse SXT', price: 7500, amount: 1, image: 'static/images/products/el-650x650.png' },
                        { id: 5, name: 'Ellanse SXT', price: 7500, amount: 1, image: 'static/images/products/el-650x650.png' },
                        { id: 6, name: 'Ellanse SXT', price: 7500, amount: 1, image: 'static/images/products/el-650x650.png' },
                    ]},
                    { id: 1234599, status: 1, date: '2019-01-05 19:18', total: 30000, products: [
                        { id: 4, name: 'Ellanse SXT', price: 7500, amount: 1, image: 'static/images/products/el-650x650.png' },
                        { id: 5, name: 'Ellanse SXT', price: 7500, amount: 1, image: 'static/images/products/el-650x650.png' },
                        { id: 6, name: 'Ellanse SXT', price: 7500, amount: 1, image: 'static/images/products/el-650x650.png' },
                        { id: 7, name: 'Ellanse SXT', price: 7500, amount: 1, image: 'static/images/products/el-650x650.png' },
                    ]},
                ],
                beforeShipOrders: [
                    { id: 1234598, status: 2, date: '2019-01-05 19:15', total: 22500, products: [
                        { id: 4, name: 'Ellanse SXT', price: 7500, amount: 1, image: 'static/images/products/el-650x650.png' },
                        { id: 5, name: 'Ellanse SXT', price: 7500, amount: 1, image: 'static/images/products/el-650x650.png' },
                        { id: 6, name: 'Ellanse SXT', price: 7500, amount: 1, image: 'static/images/products/el-650x650.png' },
                    ]},
                ],
                waittingOrders: [
                    { id: 1234599, status: 3, date: '2019-01-05 19:18', total: 30000, products: [
                        { id: 4, name: 'Ellanse SXT', price: 7500, amount: 1, image: 'static/images/products/el-650x650.png' },
                        { id: 5, name: 'Ellanse SXT', price: 7500, amount: 1, image: 'static/images/products/el-650x650.png' },
                        { id: 6, name: 'Ellanse SXT', price: 7500, amount: 1, image: 'static/images/products/el-650x650.png' },
                        { id: 7, name: 'Ellanse SXT', price: 7500, amount: 1, image: 'static/images/products/el-650x650.png' },
                    ]},
                ],
                finishOrders: [
                    { id: 123456, status: 5, date: '2019-01-05 19:12', total: 15000, products: [
                        { id: 1, name: 'Ellanse SXT', price: 7500, amount: 1, image: 'static/images/products/el-650x650.png' },
                        { id: 2, name: 'Ellanse SXT', price: 7500, amount: 1, image: 'static/images/products/el-650x650.png' },
                    ]},
                ],
			};
        },
        mounted() {
            debug('my-order page', this);
            // this.$f7.tab.show('#my-order-overview');
        },
        methods: {
            
        },
    };
</script>