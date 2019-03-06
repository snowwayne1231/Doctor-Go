<template functional>
    <div class="fixed-button" v-on="listeners" v-bind="data.attrs" :class="data.staticClass || ''">
        <div class="inner inline-middle">
            <slot/>
        </div>
    </div>
</template>
<script>
    export default {

    };
</script>
