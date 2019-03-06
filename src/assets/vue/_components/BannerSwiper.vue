<template>
    <div class="banner-swiper">
        <f7-swiper pagination :params="{ speed:500, loop: true, autoplay: {delay: 5000} }">
            <f7-swiper-slide v-for="(banner, idx) in banners" :key="idx">
                <img :src="banner" />
            </f7-swiper-slide>
        </f7-swiper>
    </div>
</template>
<script>

    export default {
        props: {
            banners: Array,
        },
        data() {
            return {
                swiperOption: {
                    
                },
            };
        },
        mounted() {
            // debug('banner-swiper');
        },
        methods: {

        },
    };
</script>
