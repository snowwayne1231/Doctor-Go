<template functional>
    <button class="btn" :class="data.staticClass || ''" v-on="listeners" v-bind="data.attrs">
        <i class="fa fa-chevron-left" v-if="props.leftArrow" />
        <slot />
        <i class="fa fa-chevron-right" v-if="props.rightArrow" />
    </button>
</template>
<script>
    export default {
        props: {
            'leftArrow': Boolean,
            'rightArrow': Boolean,
        },
    };
</script>
<style scoped>
    .btn {
        text-align: center;
        /* transition: color 0.2s ease; */
        min-width: 60px;
        min-height: 36px;
        background-color: #fff;
        outline: none;
        border: none;

    }
    .btn.active-state {
        color: #00ffc6;
    }
    .fa {
        padding: 5px;
    }
</style>
