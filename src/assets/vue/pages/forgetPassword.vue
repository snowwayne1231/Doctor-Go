<template>
    <f7-page id="forget-password" class="registration">
        <header-nav-bar back>
            <i18n slot="title">
                忘記密碼
            </i18n>
        </header-nav-bar>

        <div class="inner-content">
			<input-form :column="{ '2': [60, 40] }" @focus="onFocus" @blur="onBlur">
                <div><input :placeholder="i18n('請輸入您的手機號碼')" type="text" /></div>
                <div>
                    <div><input :placeholder="i18n('請輸入簡訊驗證碼')" type="text" /></div>
                    <div class="get-token"><btn @click="getSMSToken"><i18n>獲取驗證碼</i18n></btn></div>
                </div>
                <div>
                    <input :placeholder="i18n('請輸入您的新密碼')" type="text" />
                </div>
            </input-form>
        </div>

        <fixed-button v-if="openButton">
            <i18n>確認重設密碼</i18n>
        </fixed-button>

    </f7-page>
</template>

<script>
    import i18n from 'assets/js/utils/i18n';
    import { getToken } from 'assets/js/utils/sms';

    export default {
		data () {
			return {
                openButton: true,
			};
        },
        methods: {
            i18n,
            getSMSToken() {
                const token = getToken();
                debug(token);
            },
            onFocus(evt) {
                this.openButton = false;
            },
            onBlur(evt) {
                this.openButton = true;
            },
        }
    };
</script>