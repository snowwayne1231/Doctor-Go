<template>
    <f7-page id="forget-password" class="registration">
        <header-nav-bar back>
            <i18n slot="title" :text="title">
            </i18n>
        </header-nav-bar>

        <div class="inner-content">
			<input-form :column="{ '2': [60, 40] }" @focus="onFocus" @blur="onBlur">
                <div v-show="!isLogin"><input :placeholder="i18n('請輸入您的手機號碼')" v-model="telephone" type="tel" /></div>
                <div>
                    <div><input :placeholder="i18n('請輸入簡訊驗證碼')" type="text" v-model="smsToken" /></div>
                    <div class="get-token"><btn @click="getSmsToken"><i18n>獲取驗證碼</i18n></btn></div>
                </div>
                <div>
                    <input :placeholder="i18n('請輸入您的新密碼')" type="password" required validate v-model="newPassword" />
                </div>
                <div>
                    <input :placeholder="i18n('請確認新密碼')" type="password" required validate name="confirmPassword" v-model="confirmPassword" />
                </div>
            </input-form>
        </div>

        <fixed-button :show="openButton" @click="onClickResetPassword">
            <i18n>確認重設密碼</i18n>
        </fixed-button>

    </f7-page>
</template>

<script>
    import i18n from 'assets/js/utils/i18n';
    import { getToken } from 'assets/js/utils/sms';
    import axios from 'assets/js/utils/axios';
    import { mapState, mapGetters } from 'vuex';

    export default {
		data () {
			return {
                openButton: true,
                telephone: '',
                // smsTokenCodes: '',
                newPassword: '',
                confirmPassword: '',
                smsToken: '',
                securitySmsTokens: [],
			};
        },
        computed: {
            ...mapState(['user']),
            ...mapGetters(['isLogin']),
            title() {
                return this.isLogin ? '重設密碼' : '忘記密碼';
            },
        },
        methods: {
            i18n,
            getSmsToken() {
                const telephone = this.isLogin ? this.user.telephone : this.telephone;

                if (telephone.length < 6) {
                    return window.f7alert('請輸入正確的手機號碼');
                }
				axios({
                    uri: `sms/${telephone}`,
                    method: 'get',
                    success: (data) => {
                        // this.smsTokenCodes = data.codes;
                        this.securitySmsTokens.push({
                            telephone: telephone,
                            code: data.code,
                        });
                        window.f7alert('已送出簡訊驗證碼');
                    },
                });
            },
            onClickResetPassword() {
                if (!this.isConfirmedSmsToken()) {
                    return window.f7alert('錯誤的驗證碼');
                }
                if (this.newPassword != this.confirmPassword) {
                    return window.f7alert('請確認密碼是否一致');
                }

                const telephone = this.isLogin ? this.user.telephone : this.telephone;
                
                axios({
                    uri: 'resetpassword',
                    method: 'put',
                    data: {
                        telephone: telephone,
                        password: this.newPassword,
                        sms_token: this.smsToken,
                    },
                    success: (data) => {
                        this.securitySmsTokens = [];
                        window.f7alert('已成功修改為新密碼', () => {
                            this.$f7router.back();
                        });
                    },
                });
            },
            onFocus(evt) {
                this.openButton = false;
            },
            onBlur(evt) {
                this.openButton = true;
            },
            isConfirmedSmsToken() {
                const telephone = this.isLogin ? this.user.telephone : this.telephone;
                return this.smsToken.length >= 4 && 
                    this.securitySmsTokens.findIndex(e => e.telephone == telephone && e.code == this.smsToken) >= 0;
            },
        }
    };
</script>