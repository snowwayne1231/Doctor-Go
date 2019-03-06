<template functional>
    <ul class="list" v-on="listeners">
        <slot />
    </ul>
</template>
<script>
    export default {

    };
</script>
<style lang="scss">
    .list {
        position: relative;
        list-style: none;
        padding: 0px;
        background-color: #fff;

        >li {
            padding: 2px 4px 16px;
            position: relative;
            color: #777;
            text-align: center;

            &:first-child {
                padding-top: 16px;
            }

            &.active-state {
                color: #ccc;
            }
        }

        span {
            display: block;
            pointer-events: none;
        }
    }
</style>

