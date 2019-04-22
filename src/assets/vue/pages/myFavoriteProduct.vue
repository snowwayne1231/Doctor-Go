<template>
    <f7-page id="my-favorite-product" class="basic-favorite-page">
        <header-nav-bar back>
            <i18n slot="title">商品收藏</i18n>
        </header-nav-bar>

        <div class="inner-content" v-if="!loading && list.length > 0">
            <div class="tool-bar">
                <i18n>編輯</i18n>
            </div>
            <flex-list>
                <fr v-for="data in list" :key="data.id">
                    <fd class="line-checkbox">
                        <InputCheck :value="isChecked(data.id)" @input="onChangeCheck(data.id)" />
                    </fd>
                    <fd class="line-image">
                        <ImageLink :image="data.image" />
                    </fd>
                    <fd class="line-info" @click="gotoProduct(data.id)">
                        <span>{{data.name}}</span>
                        <!-- <span class="specification">{{data.format}}</span> -->
                        <num :price="data.price" />
                    </fd>
                </fr>
            </flex-list>
            <div class="editor-bar">
                <btn class="blue" @click="onClickDelete"><i18n>刪除</i18n></btn>
            </div>
        </div>
    </f7-page>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    
    export default {
		data () {
			return {
                loading: true, 
                checkedIds: [],
			};
        },
        computed: {
            ...mapState(['user', 'product']),
            list() {
                return this.loading
                    ? []
                    : this.user.watchlist_products.map(e => {
                        const id = e.product_id;
                        return this.product.list.find(p => p.id == id);
                    }).filter(e => !!e);
            },
        },
        mounted() {
            this.$store.dispatch('PRODUCT_CHECK_LIST').then(() => {
                this.loading = false;
            });
        },
        methods: {
            gotoProduct(id) {
                this.$f7router.navigate(`/product/${id}`);
            },
            isChecked(id) {
                return this.checkedIds.includes(id);
            },
            onChangeCheck(id) {
                const idx = this.checkedIds.indexOf(id);
                if (idx == -1) {
                    this.checkedIds.push(id);
                } else {
                    this.checkedIds.splice(idx, 1);
                }
            },
            onClickDelete() {
                const promise = this.$store.dispatch('USER_REMOVE_WATCHLIST_PRODUCT', this.checkedIds);
                promise.then(() => {
                    this.checkedIds = [];
                    window.f7alert('已移除收藏');
                });
            },
        },
    };
</script>