<template>
    <f7-page class="registration">
        <header-nav-bar back>
            <i18n slot="title">註冊</i18n>
        </header-nav-bar>
        
        <img class="logo" src="../../images/zh_tw/logo.jpg" />

        <input-form :column="{ '2': [60, 40] }" @focus="onFocus" @blur="onBlur">
            <div><i class="red">*</i><input :placeholder="i18n('請輸入您的姓氏')" type="text" name="lastName" /></div>
            <div><i class="red">*</i><input :placeholder="i18n('請輸入您的名字')" type="text" name="firstName" /></div>
            <div><i class="red">*</i><input :placeholder="i18n('請輸入您的E-Mail')" type="email" name="email" /></div>
            <div><i class="red">*</i><input :placeholder="i18n('請輸入您的醫師執照編號')" type="text" name="doctorNumber" /></div>
            <div class="doctor-file-upload" @click="chooseDoctorFile">
                <i class="red">*</i>
                <span v-if="selectedDoctorFile" class="hasFile">{{selectedDoctorFile.name}}</span>
                <i18n v-else>請輸入上船您的醫師執照圖檔</i18n>
                <input
                    type="file"
                    name="doctorFile"
                    accept="image/gif, image/jpeg, image/png"
                    hidden
                    @change="onDoctorFileChange"
                    ref="doctorFile"/>
            </div>
            <div class="country-seletor">
                <i class="red">*</i>
                <select>
                    <option default value="">請選擇國家</option>
                    <option>台灣</option>
                    <option>中華人民共和國</option>
                    <option>香港</option>
                    <option>新加坡</option>
                    <option>日本</option>
                </select>
            </div>
            <div><i class="red">*</i><input :placeholder="i18n('請輸入郵遞區號')" type="number" name="post_code" /></div>
            <div><i class="red">*</i><input :placeholder="i18n('請輸入地區/鄉鎮/城市')" type="text" name="address_1" /></div>
            <div><i class="red">*</i><input :placeholder="i18n('請輸入詳細地址')" type="text" name="address_2" /></div>
            <div><i class="red">*</i><input :placeholder="i18n('請輸入您的手機號碼')" type="text" name="phone" /></div>
            <div>
                <div><i class="red">*</i><input :placeholder="i18n('請輸入簡訊驗證碼')" type="text" name="sms" /></div>
                <div class="get-token"><btn @click="loginAction"><i18n>獲取驗證碼</i18n></btn></div>
            </div>
            <div><i class="red">*</i><input :placeholder="i18n('請輸入密碼')" type="password" name="password" /></div>
            <div><i class="red">*</i><input :placeholder="i18n('請確認密碼')" type="password" name="password_confirm" /></div>
            <div class="term">
                <one-line-table>
                    <td>
                        <f7-checkbox :checked="check_term" @change="changeCheckbox"/>
                    </td>
                    <td style="padding-left: 10px;">
                        <i18n>註冊代表同意</i18n>
                        <f7-link href="/term/user"><i18n>美醫用戶協議</i18n></f7-link>
                        <!-- 、<f7-link><i18n>隱私聲明</i18n></f7-link>
                        、<f7-link><i18n>法律聲明</i18n></f7-link> -->
                    </td>
                </one-line-table>
            </div>
        </input-form>

        <fixed-button v-if="openButton">
            <i18n>送出註冊</i18n>
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
                selectedDoctorFile: null,
			};
		},
  	    computed: mapState({
				user: state => { return state.user },
        }),
        mounted() {
            
        },
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
            chooseDoctorFile(evt) {
                this.$refs.doctorFile.click(evt);
            },
            onDoctorFileChange(evt) {
                debug('onDoctorFileChange', evt);
                const file = evt.target.files[0];
                console.log(file);
                this.selectedDoctorFile = file;
            },
			i18n,
		}
    };
</script>