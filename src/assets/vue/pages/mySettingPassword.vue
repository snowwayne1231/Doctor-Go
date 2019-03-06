<template>
    <f7-page class="my-setting">
        <header-nav-bar back>
            <i18n slot="title">重設密碼</i18n>
        </header-nav-bar>

        <input-form :column="{ '2': [30, 70] }">
            <div>
                <div><i18n>原密碼</i18n></div>
                <div><input name="firstName" :placeholder="i18n('請輸入您的原密碼')" type="text" /></div>
            </div>
            <div>
                <div><i18n>新密碼</i18n></div>
                <div><input name="lastName" :placeholder="i18n('請輸入您的新密碼')" type="text" /></div>
            </div>
        </input-form>

        <fixed-button>
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
			i18n,
			...mapActions(['userLogged'])
		}
    };
</script>