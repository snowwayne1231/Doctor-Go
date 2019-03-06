<template>
    <span class="num" :class="{ 'is-price': isPrice || price }">
        {{number}}
    </span>
</template>
<script>
    import { toThousandPlaced } from 'assets/js/utils/numberHandlers';
    export default {
        props: {
            isPrice: Boolean,
            price: Number,
        },
        computed: {
            number() {
                if (this.price) {
                    return '$' + toThousandPlaced(this.price);
                } else {
                    return (this.isPrice ? '$' : '') + toThousandPlaced(this.$slots.default[0].text);
                }
            }
        }
    };
</script>
<style scoped>
    .num {
        text-align: right;
        min-width: 20px;
    }
    .num.active-state {
        color: #00ffc6;
    }
</style>
