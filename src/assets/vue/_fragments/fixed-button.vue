<template functional>
    <div
        class="fixed-button"
        :class="{loading: props.loading}"
        v-on="listeners"
        v-bind="data.attrs"
    >
        <div class="inner inline-middle">
            <i v-if="props.loading" class="fa fa-spinner "></i>
            <slot v-else />
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            loading: Boolean,
        }
    };
</script>
