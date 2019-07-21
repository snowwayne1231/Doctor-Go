<template>
    <div class="tab-my-content">
        <div class="inner"  v-if="isLogin">
            <div class="my-header background-image-cover">
                <div class="tools">
                    <dd class="setting background-image" @click="linkToSetting" />
                    <!-- <MessageBox :unread="user.unreadMsg"/> -->
                </div>
                <div class="info">
                    <section class="left">
                        <Avatar class="profile-img" />
                    </section>
                    <section class="right inline-middle">
                        <dd class="profile-wording">
                            <span>{{user.firstName}}</span><br />
                            <i18n>紅利點數:</i18n><num class="point" :price="user.point"></num>
                            <span class="logout" @click="logout">
                                <i18n>登出</i18n>
                                <i class="fa fa-play" />
                            </span>
                        </dd>
                    </section>
                </div>
            </div>
            <div class="my-content">
                <div class="my-orders">
                    <div class="header">
                        <i18n>我的訂單</i18n>
                        <i class="fa fa-angle-right" />
                    </div>
                    <div class="content">
                        <table-list class="my-order-icons">
                            <tr>
                                <td v-for="(data, idx) in myOrderIcons" :key="idx">
                                    <f7-link :href="data.link">
                                        <ImageLink :image="data.image" />
                                        <i18n>{{data.text}}</i18n>
                                    </f7-link>
                                </td>
                            </tr>
                        </table-list>
                    </div>
                    <div class="my-cs">
                        <i18n>如有任何問題，請聯繫客服信箱：</i18n><br />doctorgo168@gmail.com
                    </div>
                </div>
                <div class="functions">
                    <table-list class="">
                        <tr>
                            <td v-for="(data, idx) in myFunctions" :key="idx">
                                <f7-link :href="data.link" @click="onClickFunctionIcon(data)">
                                    <ImageLink :image="data.image" />
                                    <i18n>{{data.text}}</i18n>
                                </f7-link>
                            </td>
                        </tr>
                    </table-list>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
export default {
    data() {
        return {
            myOrderIcons: [
                // { text: '待付款', image: 'static/images/icons/icon_order.png', link: '/myorder/tab-before-pay' },
                // { text: '待發貨', image: 'static/images/icons/icon_send.png', link: '/myorder/tab-before-ship' },
                { text: '待洽詢', image: 'static/images/icons/icon_gat.png', link: '/myorder/tab-wait' },
                { text: '團購中', image: 'static/images/icons/icon_gat.png', link: '/myorder/tab-group' },
                { text: '已完成', image: 'static/images/icons/icon_finish.png', link: '/myorder/tab-finish' },
            ],
            myFunctions: [
                { text: '商品收藏', image: 'static/images/icons/icon_fav.png', link: '/myfavorite/product' },
                { text: '文章收藏', image: 'static/images/icons/icon_blog.png', link: '/myfavorite/article' },
                { text: '積分商城', image: 'static/images/icons/icon_shop.png', link: '', clickFunction: 'ComingSoon' },
                { text: '我的密碼', image: 'static/images/icons/icon_password.png', link: '/mysetting/password' },
            ],
        };
    },
    computed: {
        ...mapState(['user']),
        ...mapGetters(['isLogin']),
    },
    mounted() {
        debug('My Tab User', this.user);
    },
    methods: {
        linkToSetting() {
            this.$f7router.navigate('/mysetting/');
        },
        onClickFunctionIcon(data) {
            if (data.clickFunction) {
                const method = this[data.clickFunction];
                method && method(data);
            }
        },
        logout() {
            this.$store.dispatch('USER_LOGOUT');
            this.$f7router.navigate('/');
        },
        ComingSoon() {
            window.f7alert('尚未開放');
        },
    },
};

</script>
