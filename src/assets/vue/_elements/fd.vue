<template functional>
    <dd class="flex-col fd" v-on="listeners" v-bind="data.attrs" :class="data.staticClass || ''">
        <slot />
    </dd>
</template>
<script>
    export default {

    };
</script>
