<template>
    <f7-page class="my-setting">
        <header-nav-bar back>
            <i18n slot="title">我的設置</i18n>
        </header-nav-bar>

        <input-form :column="{ '2': [30, 70] }" @focus="onFocus" @blur="onBlur">
            <div>
                <div><i18n>名字</i18n></div>
                <div><input name="firstName" :placeholder="i18n('請輸入您的名字')" type="text" /></div>
            </div>
            <div>
                <div><i18n>姓氏</i18n></div>
                <div><input name="lastName" :placeholder="i18n('請輸入您的姓氏')" type="text" /></div>
            </div>
            <div>
                <div><i18n>公司名稱</i18n></div>
                <div><input name="company" :placeholder="i18n('請輸入您的公司名稱')" type="text" /></div>
            </div>
            <div>
                <div><span>E-mail</span></div>
                <div><input name="email" :placeholder="i18n('請輸入您的Email')" type="email" /></div>
            </div>
            <div>
                <div><i18n>手機號碼</i18n></div>
                <div><input name="phone" :placeholder="i18n('請輸入您的手機號碼')" type="number" /></div>
            </div>
            <div>
                <div><i18n>郵遞區號</i18n></div>
                <div><input name="postCode" :placeholder="i18n('請輸入您的郵遞區號')" type="number" /></div>
            </div>
            <div>
                <div><i18n>城市</i18n></div>
                <div><input name="city" :placeholder="i18n('請輸入您的城市')" type="number" /></div>
            </div>
            <div>
                <div><i18n>地址</i18n></div>
                <div><input name="address" :placeholder="i18n('請輸入您的地址')" type="text" /></div>
            </div>
            <div>
                <div><i18n>醫師執照</i18n></div>
                <div>
                    
                </div>
            </div>
        </input-form>

        <fixed-button v-if="openButton">
            <i18n>確認修改</i18n>
        </fixed-button>
    </f7-page>
</template>


<script>
    import { mapState, mapActions } from 'vuex';
    import i18n from 'assets/js/utils/i18n';
    

    export default {
		data () {
			return {
                openButton: true,
                check_term: false,
				phone: '',
				sms_token: '',
			};
		},
  	    computed: mapState({
				user: state => { return state.user },
		}),
		methods: {
			loginAction: function() {
				const self = this;
                // Set new user into storage
                debug(this);
                // self.userLogged({name: "User", id: "#1"});
            },
            changeCheckbox() {
                this.check_term = !this.check_term;
                debug('changeCheckbox', this.check_term);
            },
            onFocus(evt) {
                this.openButton = false;
            },
            onBlur(evt) {
                this.openButton = true;
            },
			i18n,
			...mapActions(['userLogged'])
		}
    };
</script>