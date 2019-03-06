<template>
    <div class="tab-catalog-content">
        <header-nav-bar>
            <div class="search-bar-wrapper" slot="title" @click="navigateToSearch" > <SearchBar /> </div>
        </header-nav-bar>
        <div class="inner-content">
            <div class="inner-left">
                <i18n class="title">為您推薦</i18n>
                <list>
                    <li v-if="hasParent || !showSibling" @click="onClickBack">
                        <i18n>返回</i18n>
                    </li>
                    <li v-for="(data) in catalogs" :key="data.id" :class="{active: data.id === selectedCatalog.id}">
                        <f7-link @click="onClickCatalog(data)">
                            <i18n>{{data.display}}</i18n>
                        </f7-link>
                    </li>
                </list>
            </div>
            <div class="inner-right">
                <block-headmore :title="selectedCatalog.display" linkMore="/productlistfilter/hot">
                    <div class="hot-products">
                        <ProductItem
                            v-for="idx in 6"
                            :key="idx"
                            name="123"
                            image="static/images/products/el-650x650.png"
                            :price="7500"
                        />
                    </div>
                </block-headmore>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            selectedCatalog: {},
            showSibling: true,
        };
    },
    computed: {
        catalogs() {
            return this.showSibling
                ? this.getCatalogsByParentId(this.selectedCatalog.parent)
                : this.getCatalogsByParentId(this.selectedCatalog.id);
        },
        hasParent() {
            return this.selectedCatalog.parent > 0;
        },
        ...mapGetters(['getCatalogsByParentId']),
    },
    mounted() {
        this.selectedCatalog = this.$store.state.relation.catalogs.find(e => e.name == 'hot');
        debug('mounted tab catalog', this);
    },
    methods: {
        navigateToSearch() {
            this.$f7router.navigate('/search/');
        },
        onClickCatalog(catalog) {
            // debug('catalog', catalog);
            this.selectedCatalog = catalog;

            const hasChildren = !!this.$store.state.relation.catalogs.find(e => e.parent === catalog.id);
            
            this.showSibling = !hasChildren;
            
        },
        onClickBack(evt) {
            if (this.showSibling) {
                this.selectedCatalog = this.$store.state.relation.catalogs.find(e => e.id === this.selectedCatalog.parent);
                
            } else {
                this.showSibling = true;
            }
        },
    },
};

</script>
