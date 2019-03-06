<template>
    <f7-page id="product-brand">
        <header-nav-bar back>
            <i18n slot="title">品牌專區</i18n>
        </header-nav-bar>

        <div class="inner-content">

            <div class="brand-banner">
                <ImageLink class="banner" image="static/images/banners/179b6f07-421e-414d-92e5-1bb25148b27e.jpg" />
            </div>
            
            <div class="brand-list">
                <div v-for="brand in relation.brands"
                    class="brand-item"
                    :key="brand.id"
                    :title="brand.display"
                >
                    <ImageLink class="brand-image" :image="brand.image" :link="`/productbrand/${brand.name}`" />
                </div>
            </div>
        </div>
        
    </f7-page>
</template>


<script>
    import { mapState, mapActions } from 'vuex';
    

    export default {
		data () {
			return {
                catalog: null,
                brand: null,
			};
        },
        computed: {
            ...mapState(['relation']),
        },
        mounted() {
            // debug('productlistfilter', this, this.$f7route.params);
        },
        methods: {
            
        },
    };
</script>