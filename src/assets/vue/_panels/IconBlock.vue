<template>
    <div class="icon-block" @click="onClick">
        <div class="icon">
            <img :src="icon" />
        </div>
        <div class="wording inline-middle nowrap">
            <i18n>{{word}}</i18n>
        </div>
    </div>
</template>
<script>
    import i18n from 'assets/js/utils/i18n';

    export default {
        props: {
            icon: String,
            word: String,
            link: String,
        },
        methods: {
            onClick() {
                if (this.link) {
                    if (this.link.match(/^http/i)) {
                        window.open(this.link, '_blank', `location=yes,closebuttoncaption=${i18n('關閉')}`);
                    } else {
                        this.$f7router.navigate(this.link);
                    }
                }
            },
        },
    };
</script>
