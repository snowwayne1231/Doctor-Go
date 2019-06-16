<template>
    <f7-page id="product-list-filter">
        <header-nav-bar back>
            <i18n slot="title" :text="titleName"></i18n>
            <div slot="right" v-if="outsideLinkName" class="outside-link" @click="onClickOutsideLink"><span>{{outsideLinkName}}</span></div>
        </header-nav-bar>

        <div class="inner-content custom-scroll">

            <div class="infomation" v-if="brandInfomation">
                <img v-if="brandInfomation.image" class="inline-image" :src="brandInfomation.image" :style="{maxWidth:`${brandInfomation.logo_max_width || 120}px`}" />
                <div class="info-div" readonly>{{brandInfomation.description}}</div>
            </div>

            <div class="banner" v-if="metaData && metaData.event_image">
                <img :src="metaData.event_image" />
                <!-- <ImageLink :image="metaData.event_image" /> -->
            </div>

            <div class="sub-filter" v-if="childrenCatagoryData.length > 0">
                <dd class="sub-filter-item" :class="{active: selectedSubCatagory === 0}" @click="onSubFilterItemClick(0)"><i18n text="全部" />
                </dd><dd v-for="data in childrenCatagoryData"
                    class="sub-filter-item"
                    :class="{active: selectedSubCatagory === data.id}"
                    @click="onSubFilterItemClick(data.id)"
                    :key="data.id">
                    <i18n :text="data.name" />
                </dd>
            </div>
            
            <ProductWaterfall class="product-list" :items="products">
                
            </ProductWaterfall>
            
        </div>
        
    </f7-page>
</template>


<script>
    import { mapState, mapActions, mapGetters } from 'vuex';
    import i18n from 'assets/js/utils/i18n';
    

    export default {
		data () {
			return {
                mode: null,
                selectedSubCatagory: 0,
                // catalog: null,
                // brand: null,
			};
        },
        computed: {
            ...mapState(['product', 'user', 'ad']),
            metaData() {
                const catalog = this.$f7route.params.catalog;
                const brand = this.$f7route.params.brand;
                const event = this.$f7route.params.event;
                switch (this.mode) {
                    case 'brand': return this.product.brands.find(e => e.id == brand);
                    case 'catalog': return isNaN(catalog)
                        ? this.product.categories.find(e => e.key == catalog)
                        : this.product.categories.find(e => e.id == catalog);
                    case 'event': return this.ad.events.find(e => e.key == event);
                    default: return null;
                }
            },
            titleName(self) {
                if (self.metaData) {
                    switch (this.mode) {
                        case 'brand': return i18n('品牌') + " - " + self.metaData.name;
                        default: return self.metaData.name;
                    }
                }
                return '';
            },
            products(self) {
                let list = [];
                if (self.metaData) {
                    debug(self.metaData);
                    switch (self.mode) {
                        case 'brand':
                            list = self.product.list.filter(e => e.brand_id == self.metaData.id);
                        break;
                        case 'catalog':
                            const catalogChildrenIds = self.selectedSubCatagory
                                ? [self.selectedSubCatagory].concat(
                                    (self.product.categories.find(e => e.id === self.selectedSubCatagory) || {}).children || []
                                )
                                : [self.metaData.id].concat(self.metaData.children);
                            
                            list = self.product.list.filter(e => catalogChildrenIds.includes(e.category_id));
                        break;
                        case 'event':
                            const childrenIds = self.metaData.product_ids;
                            
                            list = self.product.list.filter(e => childrenIds.includes(e.id));
                        break;
                        default:
                    }
                    
                } else {
                    debug('productfilter products not found', self);
                }

                return list;
            },
            brandInfomation(self) {
                return self.mode === 'brand'
                    ? self.metaData
                    : null;
            },
            childrenCatagoryData(self) {
                return (self.metaData && self.mode === 'catalog')
                    ? self.metaData.children.map(e => {
                        return self.product.categories.find(p => p.id == e) || {};
                    })
                    : [];
            },
            outsideLinkName(self) {
                if (self.mode === 'catalog' && self.metaData) {
                    return self.metaData.outside_link_name && self.metaData.outside_link_name.trim
                        ? self.metaData.outside_link_name.trim()
                        : false
                }
                return false;
            }
        },
        created() {
            const catalog = this.$f7route.params.catalog;
            const brand = this.$f7route.params.brand;
            const event = this.$f7route.params.event;

            switch (true) {
                case !!catalog: this.mode = 'catalog'; break;
                case !!brand: this.mode = 'brand'; break;
                case !!event: this.mode = 'event'; break;
                default: this.mode = null;
            }

            this.beforeInit();

            // this.$f7router.navigate('/');
        },
        mounted() {
            // debug('productlistfilter', this, this.$f7route.params);
        },
        methods: {
            beforeInit() {
                this.ad.events.length === 0 && this.$store.dispatch('AD_FETCH_EVENTS');
                return this.$store.dispatch('PRODUCT_CHECK_LIST');
            },
            init() {
                
            },
            onSubFilterItemClick(catalogId) {
                this.selectedSubCatagory = catalogId;
            },
            onClickOutsideLink() {
                this.metaData.outside_link && window.open(this.metaData.outside_link, '_blank', `location=yes,closebuttoncaption=${i18n('關閉')}`);
            },
        },
    };
</script>