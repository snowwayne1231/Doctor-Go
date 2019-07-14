<template>
    <f7-page id="collective-buying">
        <header-nav-bar back>
            <i18n slot="title">團購專區</i18n>
        </header-nav-bar>

        <div class="inner-content">

            <div class="collective-filter">
                <SearchBar
                    v-model="searchText"
                    :change="onSearchChange"
                    @blur="onSearchBlur"
                    @focus="onSearchFocus"
                    placeholder="輸入產品名稱來搜尋"
                    ref="searchBar">
                </SearchBar>
            </div>

            <div class="collective-list">
                <table-list>
                    <tr>
                        <th width="45%">
                            <i18n>團購商品</i18n>
                        </th>
                        <th width="25%">
                            <i18n>當前單價</i18n>
                        </th>
                        <th width="30%">
                            <i18n>剩餘時間</i18n>
                        </th>
                    </tr>
                    <tr v-for="data in showList" :key="data.id" @click="onClickList(data)">
                        <td class="product">
                            <ImageLink :image="data.product.image" class="product-child" /><span class="product-child">{{data.product.name}}</span>
                        </td>
                        <td>
                            <div class="current-price">
                                <num :price="data.now_price" />
                            </div>
                        </td>
                        <td>
                            <div class="left-time">
                                <div class="left-days" v-if="data.left_days > 0">
                                    <num :value="data.left_days" /><i18n text="天"/>
                                </div>
                                <div class="left-minutes" v-else>
                                    <num :value="data.left_minutes" /><i18n text="分鐘"/>
                                </div>
                            </div>
                        </td>
                    </tr>
                </table-list>
            </div>
        </div>
        
    </f7-page>
</template>


<script>
    import { mapState, mapGetters } from 'vuex';
    import axios from 'assets/js/utils/axios';
    import i18n from 'assets/js/utils/i18n';

    export default {
		data () {
			return {
                searchText: '',
                openAutocomplete: false,
			};
        },
        computed: {
            ...mapState(['product', 'groupBuying']),
            ...mapGetters(['groupBuyingList']),
            showList(self) {
                const regp = new RegExp(self.searchText, 'i');
                return this.groupBuyingList.filter(e => e.product.name && e.product.name.match(regp)).sort((a,b) => a.left_mintes - b.left_minutes);
            },
        },
        mounted() {
            this.$store.dispatch('PRODUCT_CHECK_LIST');
            this.nextNow();
        },
        created() {
            this.$store.dispatch('GROUPBUYING_FETCH');
        },
        beforeDestroy() {
            window.clearTimeout(this._timer);
        },
		methods: {
			onSearchChange(value) {
                
            },
            onSearchBlur(evt) {
                // debug('OnSearchBlur', this.matchedProductSummaries);
                this.openAutocomplete = false;
            },
            onSearchFocus(evt) {
                // debug('onSearchFocus', this.matchedProductSummaries);
                this.openAutocomplete = true;
            },
            onClickList(data) {
                this.$f7router.navigate(`/collectivebuying/${data.id}`);
            },
            nextNow() {
                const now = new Date().getTime();
                this.$store.commit('GROUPBUYING:UPDATE', {now});
                this._timer = window.setTimeout(this.nextNow, 60000);
            },
		},
    };
</script>