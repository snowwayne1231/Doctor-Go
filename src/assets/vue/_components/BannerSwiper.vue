<template>
    <div class="banner-swiper">
        <f7-swiper v-if="bannerData.length > 0" pagination :params="{ speed:500, loop: true, autoplay: {delay: 5000} }">
            <f7-swiper-slide v-for="(banner, idx) in bannerData" :key="idx">
                <a @click="onClickBanner(banner)"><img :src="banner.image" /></a>
            </f7-swiper-slide>
        </f7-swiper>
    </div>
</template>
<script>
    import { mapState } from 'vuex';

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
        computed: {
            ...mapState(['ad']),
            bannerData() {
                return this.banners
                    ? this.banners
                    : this.ad.banners;
            },
        },
        mounted() {
            // debug('banner-swiper');
            
        },
        methods: {
            onClickBanner(data) {
                if (data.link && data.link.match(/http/)) {
                    window.open(data.link, '_blank');
                }
            },
        },
    };
</script>
