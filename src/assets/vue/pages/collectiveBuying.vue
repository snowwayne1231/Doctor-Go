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
                    placeholder="輸入發起人名稱或產品名稱來搜尋"
                    ref="searchBar">
                </SearchBar>
            </div>

            <div class="collective-list">
                <table-list>
                    <tr>
                        <th width="15%">
                            <i18n>發起人</i18n>
                        </th>
                        <th width="60%">
                            <i18n>商品</i18n>
                        </th>
                        <th width="25%">
                            <i18n>結束時間</i18n>
                        </th>
                    </tr>
                    <!-- <tr v-for="data in showList" :key="data.id" @click="onClickList(data)">
                        <td class="center promoter">
                            <ImageLink :image="data.promoterImage" />
                        </td>
                        <td class="product">
                            <ImageLink :image="data.productImage" class="product-child" /><span class="product-child">{{data.productName}}</span>
                        </td>
                        <td>
                            <DateTime :value="data.endDate" />
                        </td>
                    </tr> -->
                </table-list>
            </div>
        </div>
        
    </f7-page>
</template>


<script>

    export default {
		data () {
			return {
                searchText: '',
                openAutocomplete: false,
                collecting: [
                    { id: 1, promoterId: 1, promoterName: '八爪博士', promoterImage: 'static/images/face.png', productId: 1, productName: '皮秒雷射儀', productImage: 'static/images/products/el-650x650.png', startDate: '2019-03-04', endDate: '2019-03-15'},
                    { id: 2, promoterId: 2, promoterName: '孫升升', promoterImage: 'static/images/face.png', productId: 12, productName: '水龍捲皮膚氫淨機', productImage: 'static/images/products/el-650x650.png', startDate: '2019-03-04', endDate: '2019-03-15'},
                    { id: 3, promoterId: 3, promoterName: '艾莉莎莎', promoterImage: 'static/images/face.png', productId: 13, productName: '修護抗老系列', productImage: 'static/images/products/el-650x650.png', startDate: '2019-03-04', endDate: '2019-03-15'},
                    { id: 4, promoterId: 4, promoterName: '理科太大', promoterImage: 'static/images/face.png', productId: 14, productName: '法薇亞MC123逆齡三部曲臉部精華液', productImage: 'static/images/products/el-650x650.png', startDate: '2019-03-04', endDate: '2019-03-15'},
                ],
                matchedList: [],
			};
        },
        computed: {
            showList() {
                return this.searchText.length > 0 ? this.matchedList : this.collecting;
            },
        },
        created() {
            window.f7alert('尚未開放, 敬請期待', () => {
                this.$f7router.back();
            });
        },
		methods: {
			onSearchChange(value) {
                if (value.length > 0) {
                    const collecting = this.collecting;
                    const regp = new RegExp(value, 'i');
                    this.matchedList = collecting
                        .filter(e => e.promoterName.match(regp) || e.productName.match(regp))
                        .slice(0, 100);
                } else {
                    this.matchedList = this.collecting.slice(0, 100);
                }
                debug(this.matchedList);
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
		},
    };
</script>