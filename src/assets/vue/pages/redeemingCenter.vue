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
                        <td><num>{{user.point}}</num></td>
                    </tr>
                </table-list>
            </div>

            <BannerSwiper :banners="banners" />

            <div class="products">
                <div>
                    <i18n class="title">可折抵或換購的商品</i18n>
                </div>
                <div>
                    <ProductItem
                        v-for="data in redeemableProducts"
                        :key="data.id"
                        :name="data.name"
                        :image="data.image"
                        :price="data.price"
                        :reduced="data.reduced"
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
                banners: [
                    'static/images/banners/45ef416c-8d78-43fd-a713-ed704a5a352c.jpg',
                    'static/images/banners/45ef416c-8d78-43fd-a713-ed704a5a352c.jpg',
                ],
			};
        },
        computed: {
            ...mapState(['product', 'user']),
            redeemableProducts() {
                return this.product.summarylist.filter(e => e.reduced <= this.user.point);
            },
        },
		methods: {
			
		},
    };
</script>