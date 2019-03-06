<template functional>
    <div class="flex-row fr" v-on="listeners" v-bind="data.attrs" :class="data.staticClass || ''">
        <slot />
    </div>
</template>
<script>
    export default {

    };
</script>
<style scoped>
    .flex-row {
        position: relative;
        display: flex;
    }
</style>
