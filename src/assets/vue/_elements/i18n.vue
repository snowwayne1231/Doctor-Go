<template>
    <span class="i18n" :title="txt">{{txt}}</span>
</template>
<script>
    import i18n from 'assets/js/utils/i18n';
    export default {
        // methods: {
        //     i18n,
        // },
        props: {
            text: String,
        },
        computed: {
            txt() {
                return this.text
                    ? i18n(this.text)
                    : this.$slots.default
                        ? i18n(this.$slots.default[0].text)
                        : '';
            }
        },
    };
</script>
