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
            value: Number,
        },
        computed: {
            number() {
                if (!isNaN(this.price)) {
                    return '$' + toThousandPlaced(this.price);
                } else if (this.value) {
                    return toThousandPlaced(this.value);
                } else {
                    const slot = this.$slots.default
                        ? this.$slots.default[0] || {}
                        : {};
                    const text = slot.text || '';
                    return (this.isPrice ? '$' : '') + toThousandPlaced(text);
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
