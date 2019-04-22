<template functional>
    <table class="table-list" v-bind="data.attrs" v-on="listeners" :class="data.staticClass || ''">
        <tbody>
            <slot />
        </tbody>
    </table>
</template>
<script>
    export default {

    };
</script>
