<template>
    <f7-page id="redeeming-center">
        <header-nav-bar back>
            <i18n slot="title" :text="title"></i18n>
        </header-nav-bar>

        <div class="inner-content">

            <div class="my-info">
                <table-list>
                    <tr>
                        <td><i18n>我的點數</i18n></td>
                        <td><num :value="user.point"></num></td>
                    </tr>
                </table-list>
            </div>

            <BannerSwiper :banners="ad.pointBanners" />

            <div class="products">
                <div>
                    <i18n class="title">可折抵或換購的商品</i18n>
                </div>
                <div>
                    <ProductItem
                        v-for="data in redeemableProducts"
                        :id="data.id"
                        :key="data.id"
                        :name="data.name"
                        :image="data.image"
                        :price="data.price"
                        :reduced="data.point_can_be_discount"
                    />
                </div>
                
            </div>

        </div>
        
    </f7-page>
</template>


<script>
    import { mapState } from 'vuex';

    export default {
		data () {
			return {
                title: '點數中心',
			};
        },
        computed: {
            ...mapState(['product', 'user', 'ad']),
            redeemableProducts() {
                return this.product.list.filter(e => {
                    return e.status == 1 && e.point_can_be_discount && e.point_can_be_discount <= this.user.point;
                });
            },
        },
        mounted() {
            // debug(this.title, this.product);
            this.$store.dispatch('PRODUCT_CHECK_LIST');
            this.ad.pointBanners.length == 0 && this.$store.dispatch('AD_FETCH_POINT_BANNERS');
        },
		methods: {
			
		},
    };
</script>