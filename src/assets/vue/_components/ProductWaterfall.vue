<template>
    <div class="product-waterfall">
        <div class="pw-items">
            <ProductItem v-for="product in products" :key="product.id"
                :id="product.id"
                :name="product.name"
                :price="product.price"
                :image="product.image"
                :reduced="product.point_can_be_discount"
            >
            </ProductItem>
        </div>
        <div class="pw-loading" ref="loading" @click="onAnyScroll">
            <i class="fa fa-spinner" v-if="overflow"></i>
        </div>
    </div>
</template>
<script>
    import { sumOffset, getScrollParent } from 'assets/js/utils/domHandlers';
    export default {
        props: {
            items: Array,
        },
        data() {
            return {
                max: 4,
            };
        },
        computed: {
            products(self) {
                return self.items.filter((e, idx) => idx < self.max);
            },
            overflow(self) {
                return self.items.length > self.max;
            },
        },
        watch: {
            items(next, old) {
                this.max = 4;
            },
        },
        mounted() {
            window.addEventListener('scroll', this.onAnyScroll, true);
            debug('waterfall mounted');
        },
        methods: {
            onAnyScroll() {
                if (this.overflow) {
                    
                    const dom = this.$refs.loading;
                    const parent = getScrollParent(dom);

                    if (parent) {
                        const offsetTop = sumOffset([dom, parent]);
                        const scrollTop = parent.scrollTop;
                        const clientHeight = parent.clientHeight;
                        const sumTop = scrollTop + clientHeight;

                        if (sumTop >= offsetTop) {
                            this.max += 2;
                        }

                        console.log('onAnyScroll', offsetTop, [scrollTop, clientHeight], [dom, parent]);
                    } else {
                        this.max += 2;
                    }
                    
                    
                }
            },
        },
        destroyed() {
            window.removeEventListener('scroll', this.onAnyScroll, true);
        },
    };
</script>
