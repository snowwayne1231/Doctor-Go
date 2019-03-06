<template>
    <f7-page id="product-list-filter">
        <header-nav-bar back>
            <i18n slot="title">{{titleName}}</i18n>
        </header-nav-bar>

        <div class="inner-content">

            <div class="infomation" v-if="infomation">
                <ImageLink v-if="brand" :image="brand.image" />
                <div>
                    {{infomation}}
                </div>
            </div>

            <div class="banner">
                <ImageLink image="static/images/banners/f4e4979b-8197-498e-8144-34a7b24d8df8.jpg" />
            </div>
            
            <div class="product-list">
                <ProductItem v-for="product in products" :key="product.id"
                    :name="product.name"
                    :price="product.price"
                    :image="product.image"
                >
                </ProductItem>
            </div>
            
        </div>
        
    </f7-page>
</template>


<script>
    import { mapState, mapActions } from 'vuex';
    import i18n from 'assets/js/utils/i18n';
    

    export default {
		data () {
			return {
                catalog: null,
                brand: null,
			};
        },
        created() {
            const catalog = this.$f7route.params.catalog;
            const brand = this.$f7route.params.brand;
            
            if (catalog) {
                this.catalog = this.$store.state.relation.catalogs.find(e => e.name === catalog);
                return;
            }

            if (brand) {
                this.brand = this.$store.state.relation.brands.find(e => e.name === brand);
                return;
            }

            this.$f7router.navigate('/');
        },
        mounted() {
            // debug('productlistfilter', this, this.$f7route.params);
        },
        computed: {
            titleName(self) {
                return self.brand
                    ? i18n('品牌') + " - " + self.brand.display
                    : self.catalog.display;
            },
            products(self) {
                let summarylist = [];

                if (self.brand) {
                    
                    summarylist = self.$store.state.product.summarylist.filter(e => e.brand === self.brand.id);

                } else if (self.catalog){
                    const productIds = self.$store.state.relation.catalogToProduct
                        .filter(e => e.catalog === self.catalog.id)
                        .map(e => e.product);
                    
                    summarylist = self.$store.state.product.summarylist.filter(e => productIds.includes(e.id));
                } else {
                    debug('products not found', self);
                    summarylist = [];
                }

                return summarylist;
            },
            infomation(self) {
                return self.brand
                    ? self.brand.info
                    : null;
            },
        },
        methods: {
            
        },
    };
</script>