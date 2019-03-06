<template>
    <f7-page class="login">
        <header-nav-bar back>
            <i18n slot="title">登入</i18n>
        </header-nav-bar>

        <img class="logo" src="../../images/zh_tw/logo.jpg" />

        <input-form :column="{ '2': [15, 85] }" @focus="onFocus" @blur="onBlur">
            <div>
                <div><i18n>帳號</i18n></div>
                <div><input v-model="account" :placeholder="i18n('用戶名/手機號碼')" type="text" /></div>
            </div>
            <div>
                <div><i18n>密碼</i18n></div>
                <div class="password">
                    <input v-model="password" :placeholder="i18n('請輸入密碼')" :type="openPassword ? 'text' : 'password'" />
                    <i class="eye fa fa-eye" :class="{ open: openPassword }" @click="changePassword"/>
                </div>
            </div>
        </input-form>

        <div class="btns">
            <f7-link href="/registration/"><i18n>快速註冊</i18n></f7-link>
            <f7-link href="/forgetpassword/"><i18n>忘記密碼</i18n></f7-link>
        </div>
        
        <fixed-button  v-if="openButton" @click="loginAction">
            <i18n>登入</i18n>
        </fixed-button>
        
    </f7-page>
</template>


<script>
    import { mapState, mapActions } from 'vuex';
    import i18n from 'assets/js/utils/i18n';
    

    export default {
		data () {
			return {
                openPassword: false,
                openButton: true,
				password: '',
				account: '',
			};
		},
  	    computed: mapState({
			user: state => { return state.user },
		}),
		methods: {
			loginAction: function() {
				this.$store.dispatch('USER_LOGIN', {
                    id: 1,
                    account: this.account,
                    name: '測試用戶',
                    firstName: '測試用戶',
                    lastName: '姓測',
                    token: 'qq123',
                    unreadMsg: 1,
                    point: Math.ceil(Math.random() * 2500),
                });
                this.$f7router.back();
            },
            changePassword() {
                this.openPassword = !this.openPassword;
            },
            onFocus(evt) {
                debug('login', evt);
                this.openButton = false;
            },
            onBlur(evt) {
                this.openButton = true;
            },
			i18n,
			...mapActions(['USER_LOGIN'])
		}
    };
</script>