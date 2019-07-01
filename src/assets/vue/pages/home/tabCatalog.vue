<template>
    <div class="tab-catalog-content">
        <header-nav-bar>
            <div class="search-bar-wrapper" slot="title" @click="navigateToSearch" > <SearchBar /> </div>
        </header-nav-bar>
        <div class="inner-content custom-scroll" :class="{loading: !selectedCatalog}">
            <div class="inner-left" v-if="selectedCatalog">
                <i18n class="title">為您推薦</i18n>
                <list>
                    <li v-if="hasParent" @click="onClickBack" class="back">
                        <i class="fa fa-caret-left">{{selectedCatalog.parent.name}}</i>
                    </li>
                    <li v-for="(data) in catalogs" :key="data.id" :class="{active: data.id === selectedCatalog.id}">
                        <f7-link @click="onClickCatalog(data)">
                            <i18n :text="data.name"></i18n>
                        </f7-link>
                        <ul class="li-children" :class="{show: data.id === selectedCatalog.id}">
                            <li
                                v-for="(d, idx) in selectedCatalog.childrenData"
                                :key="idx"
                                class="li-children-li nowrap"
                                @click="onClickCatalog(d)"
                            >{{d.name}}</li>
                        </ul>
                    </li>
                </list>
            </div>
            <div class="inner-right" v-if="selectedCatalog">
                <block-headmore v-if="selectedCatalog" :title="selectedCatalog.name" :linkMore="`/productlistfilter/${selectedCatalog.id}`">
                    
                    <ProductWaterfall class="hot-products" :items="products">
                    </ProductWaterfall>

                </block-headmore>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
    data() {
        return {
            selectedCatalog: null,
        };
    },
    computed: {
        ...mapState(['product']),
        ...mapGetters(['getPorductCategoriesByParentId']),
        products(self) {
            const ids = [self.selectedCatalog.id].concat(self.selectedCatalog.children);
            return self.product.list.filter(e => ids.includes(e.category_id) && e.status == 1).slice(0, 6);
        },
        catalogs() {
            return this.selectedCatalog.parent_id
                ? this.getPorductCategoriesByParentId(this.selectedCatalog.parent_id)
                : this.getPorductCategoriesByParentId(this.selectedCatalog.parent_id);
        },
        hasParent() {
            return this.selectedCatalog
                ? this.selectedCatalog.parent_id
                : false;
        },
        
    },
    mounted() {
        
        // debug('mounted tab catalog', this);
        this.$store.dispatch('PRODUCT_CHECK_LIST').then(() => {
            // waitting for data set
            window.setTimeout(() => {
                
                this.setSelectedCatalog();
            }, 250);
        });
    },
    methods: {
        setSelectedCatalog(id) {
            let catalog = id
                ? this.product.categories.find(e => e.id == id)
                : this.product.categories[0];
            if (catalog) {
                catalog = {...catalog};
                catalog.childrenData = catalog.children
                    .map(cid => this.product.categories.find(e => e.id == cid))
                    .filter(data => data.parent_id == catalog.id);
            }
            this.selectedCatalog = catalog;
        },
        navigateToSearch() {
            this.$f7router.navigate('/search/');
        },
        onClickCatalog(catalog) {
            // debug('catalog', catalog);
            this.setSelectedCatalog(catalog.id);

            const hasChildren = catalog.children.length > 0;
        },
        onClickBack(evt) {
            this.setSelectedCatalog(this.selectedCatalog.parent_id);
        },
    },
};

</script>
