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
    import i18n from 'assets/js/utils/i18n';
    import { getPathByNewsData } from 'assets/js/utils/navigateHandlers';

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
                switch (data.link_type) {
                    case 6: case "6":
                        data.link && data.link.match(/http/) && this.openlink(data.link);
                    break;
                    default:
                        this.naviExternalLink(data);
                }
                
            },
            openlink(link) {
                window.open(link, '_blank', `location=yes,closebuttoncaption=${i18n('關閉')}`);
            },
            naviExternalLink(data) {
                const path = getPathByNewsData(data);
                this.$f7router.navigate(path);
            },
        },
    };
</script>
