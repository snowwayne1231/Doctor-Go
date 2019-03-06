<template>
    <div class="block-headmore">
        <div class="title clear"><i18n :text="title" /><more :to="linkMore"/></div>
        <div class="content">
            <slot />
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            title: String,
            linkMore: String,
        },
        mounted() {
            // debug('block-headmore', this);
        },
    };
</script>
