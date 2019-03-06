<template>
    <f7-page id="search" @pageAfterIn="onPageAfterIn">
        <header-nav-bar back>
            <SearchBar
                slot="title"
                v-model="searchText"
                :change="onSearchChange"
                @blur="onSearchBlur"
                @focus="onSearchFocus"
                ref="searchBar">
            </SearchBar>
        </header-nav-bar>

        <div class="inner-content">
            <div class="autocomplete-list" v-show="shouldOpen">
                <f7-link v-for="summary in matchedProductSummaries" :key="summary.id" class="nowrap" @click="onClickAutocomplete(summary)">
                    {{summary.name}}
                </f7-link>
            </div>
            <div class="product-filter" v-show="!shouldOpen">
                <ProductItem
                    v-for="summary in matchedProductSummaries" :key="summary.id"
                    :name="summary.name"
                    :image="summary.image"
                    :price="summary.price"
                />
            </div>
        </div>

    </f7-page>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    

    export default {
		data () {
			return {
                openAutocomplete: true,
                searchText: '',
                matchedProductSummaries: [],
			};
        },
        mounted() {
            debug('search page', this);
            // this.$refs.searchBar.focusInput();
            // this.onSearchChange(this.searchText);
        },
        computed: {
            ...mapState({
                product: state => { return state.product; },
            }),
            shouldOpen() {
                return this.openAutocomplete && this.searchText.length < 5;
            },
        },
        methods: {
            onPageAfterIn() {
                this.$refs.searchBar.focusInput();
                this.onSearchChange(this.searchText);
            },
            onSearchChange(value) {
                if (value.length > 0) {
                    const summarylist = this.product.summarylist;
                    const regp = new RegExp(value, 'i');
                    this.matchedProductSummaries = summarylist
                        .filter(e => e.name.match(regp))
                        .slice(0, 12);
                } else {
                    this.matchedProductSummaries = this.product.summarylist.slice(0, 12);
                } 
            },
            onSearchBlur(evt) {
                // debug('OnSearchBlur', this.matchedProductSummaries);
                this.openAutocomplete = false;
            },
            onClickAutocomplete(summary) {
                this.searchText = summary.name;
                this.openAutocomplete = false;
            },
            onSearchFocus(evt) {
                // debug('onSearchFocus', this.matchedProductSummaries);
                this.openAutocomplete = true;
            },
        },
    };
</script>