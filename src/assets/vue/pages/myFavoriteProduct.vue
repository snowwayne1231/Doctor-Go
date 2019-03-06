<template>
    <f7-page id="my-favorite-product" class="basic-favorite-page">
        <header-nav-bar back>
            <i18n slot="title">商品收藏</i18n>
        </header-nav-bar>

        <div class="inner-content">
            <div class="tool-bar">
                <i18n>編輯</i18n>
            </div>
            <flex-list>
                <fr v-for="data in products" :key="data.id">
                    <fd class="line-checkbox">
                        <InputCheck v-model="checkedId[data.id]"/>
                    </fd>
                    <fd class="line-image">
                        <ImageLink :image="data.image" />
                    </fd>
                    <fd class="line-info" @click="gotoProduct">
                        <span>{{data.name}}</span>
                        <span class="specification">{{data.format}}</span>
                        <num :price="data.price" />
                    </fd>
                </fr>
            </flex-list>
            <div class="editor-bar">
                <btn class="blue"><i18n>刪除</i18n></btn>
            </div>
        </div>
    </f7-page>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    
    export default {
		data () {
            const products = [
                { id: 1, name: 'Ellanse STX', format: '1c.c', price: 7500, image: 'static/images/products/el-650x650.png' },
                { id: 2, name: 'Ellanse STXII', format: '2c.c', price: 27500, image: 'static/images/products/el-650x650.png' },
                { id: 3, name: 'Ellanse STXIII', format: '3c.c', price: 37500, image: 'static/images/products/el-650x650.png' },
            ];

            const checkedId = {};

            products.map(e => {
                checkedId[e.id] = false;
            });

			return {
                products, 
                checkedId,
			};
        },
        methods: {
            gotoProduct() {
                this.$f7router.navigate('/product/');
            },
        },
    };
</script>