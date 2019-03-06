<template>
    <f7-link class="more" :href="toHref">
        <slot v-if="hasSlot"/>
        <i18n v-else>查看更多>></i18n>
    </f7-link>
</template>
<script>
    export default {
        props: {
            to: String,
        },
        computed: {
            hasSlot() {
                return !!this.$slots.default;
            },
            toHref() {
                return this.to || '';
            },
        },
    };
</script>
<style scoped>
    .more {
        text-align: center;
    }
    .more.active-state {
        color: #00ffc6;
    }
</style>
