<template>
    <div class="product-item" @click="showProduct">
        <div class="item-inner">
            <div class="container-above">
                <div class="product-image" :style="imageStyle" />
                <i v-if="reduced" class="reduced"><i18n>點數可抵</i18n>: <num :price="reduced"></num></i>
            </div>
            <div class="container-below">
                <div class="name nowrap"><i18n>{{name}}</i18n></div>
                <div class="price clear nowrap">
                    <i18n class="word">參考價格</i18n>
                    <num :price="price"></num>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            id: Number,
            image: String,
            name: String,
            price: Number,
            specialPrice: Number,
            reduced: Number,
        },
        computed: {
            imageStyle() {
                return { backgroundImage: `url(${this.image})` };
            },
        },
        methods: {
            showProduct() {
                this.$f7router.navigate(`/product/${this.id}`);
            },
        },
    };
</script>
