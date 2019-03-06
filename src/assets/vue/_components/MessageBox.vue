<template>
    <div class="message-box">
        <div class="container" @click="navigateTo" v-show="isLogin">
            <i class="fa fa-envelope-o" />
            <i class="unread" :class="{show: unread > 0}"></i>
        </div>
    </div>
</template>
<script>

    import { mapGetters } from 'vuex';

    export default {
        mounted() {
            // debug(this.$f7router);
        },
        computed: {
            ...mapGetters(['isLogin']),
            unread: (self) => {
                return self.$store.state.user.unreadMsg;
            },
        },
        methods: {
            navigateTo() {
                if (true) {
                    this.$f7router.navigate('/mymessage/');
                } else {
                    this.$f7router.navigate('/login/');
                }
            },
        },
    };
</script>
