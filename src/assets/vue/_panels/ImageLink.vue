<template>
    <div
        class="image-link"
        @click="onClick"
        :data-image="image"
        :style="backgroundObject">
        <div v-if="word" class="wording inline-middle nowrap">
            <i18n>{{word}}</i18n>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            image: String,
            word: String,
            link: String,
        },
        computed: {
            backgroundObject() {
                return {
                    backgroundImage: `url(${this.image})`,
                }
            },
        },
        methods: {
            onClick() {
                
                this.link && this.$f7router.navigate(this.link);
            },
        },
    };
</script>
