<template>
    <f7-page class="registration">
        <header-nav-bar back>
            <i18n slot="title">註冊</i18n>
        </header-nav-bar>

        <div class="inner-content" :class="{'full-heigt': !openButton}">
            <img class="logo" src="../../images/zh_tw/logo.jpg" />

            <input-form :column="{ '2': [60, 40] }" @focus="onFocus" @blur="onBlur">
                <div><i class="red">*</i><input :placeholder="i18n('請輸入您的姓氏')" type="text" required validate name="lastName" v-model="formData.lastname" /></div>
                <div><i class="red">*</i><input :placeholder="i18n('請輸入您的名字')" type="text" required validate name="firstName" v-model="formData.firstname" /></div>
                <div><i class="red">*</i><input :placeholder="i18n('請輸入您的E-Mail')" type="email" required validate name="email" v-model="formData.email" /></div>
                <div><i class="red">*</i><input :placeholder="i18n('請輸入您的醫師執照編號')" type="text" required validate name="doctorProfile" v-model="formData.doctorProfile" /></div>
                <div class="doctor-file-upload">
                    <!-- <i class="red">*</i> -->
                    <span v-if="formData.doctorProfileImage" class="hasFile">{{formData.doctorProfileImage.name}}</span>
                    <i18n v-else @click="chooseDoctorFile">請上傳您的醫師執照圖檔</i18n>
                    <input
                        type="file"
                        name="doctorProfileImage"
                        accept="image/*"
                        :class="{hide: !!formData.doctorProfileImage}"
                        @change="onDoctorFileChange"
                    />
                </div>
                <div>
                    <!-- <i class="red">*</i> -->
                    <input :placeholder="i18n('請輸入您的診所開業執照編號')" type="text" name="doctorClinic" v-model="formData.doctorClinic" /></div>
                <div class="doctor-file-upload">
                    <!-- <i class="red">*</i> -->
                    <span v-if="formData.doctorClinicImage" class="hasFile">{{formData.doctorClinicImage.name}}</span>
                    <i18n v-else @click="chooseDoctorFile">請上傳您的診所開業執照圖檔</i18n>
                    <input
                        type="file"
                        name="doctorClinicImage"
                        accept="image/*"
                        :class="{hide: !!formData.doctorClinicImage}"
                        @change="onDoctorFileChange"
                    />
                </div>
                <div class="country-seletor">
                    <i class="red">*</i>
                    <select v-model="formData.country">
                        <option default selected value="">請選擇國家</option>
                        <option v-for="country in geo.countries" :key="country.id" :value="country.id">
                            {{country.name}}
                        </option>
                    </select>
                </div>
                <div><i class="red">*</i><input :placeholder="i18n('請輸入郵遞區號')" type="number" required validate name="post_code" v-model="formData.postCode" /></div>
                <div><i class="red">*</i><input :placeholder="i18n('請輸入地區/鄉鎮/城市')" type="text" name="address_1" v-model="formData.address_1" /></div>
                <div><i class="red">*</i><input :placeholder="i18n('請輸入詳細地址')" type="text" name="address_2" v-model="formData.address_2" /></div>
                <div><i class="red">*</i><input :placeholder="i18n('請輸入您的手機號碼')" type="tel" name="phone" required validate v-model="formData.telephone" /></div>
                <div>
                    <div><i class="red">*</i><input :placeholder="i18n('請輸入簡訊驗證碼')" type="number" name="smsToken" v-model="smsToken" /></div>
                    <div class="get-token"><btn @click="getSmsToken"><i18n>獲取驗證碼</i18n></btn></div>
                </div>
                <div><i class="red">*</i><input :placeholder="i18n('請輸入密碼')" type="password" required validate name="password" v-model="formData.password" /></div>
                <div><i class="red">*</i><input :placeholder="i18n('請確認密碼')" type="password" required validate name="confirmPassword" v-model="confirmPassword" /></div>
                <div class="term">
                    <one-line-table>
                        <td>
                            <f7-checkbox :checked="checkTerm" @change="changeCheckbox"/>
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
        </div>

        <fixed-button :show="openButton" :loading="loadingButton" @click="register">
            <i18n>送出註冊</i18n>
        </fixed-button>
    </f7-page>
</template>


<script>
    import { mapState, mapActions } from 'vuex';
    import i18n from 'assets/js/utils/i18n';
    import axios from 'assets/js/utils/axios';
    

    export default {
		data () {
			return {
                openButton: false,
                loadingButton: false,
                checkTerm: false,
                formData: {
                    lastname: '',
                    firstname: '',
                    email: '',
                    doctorProfile: '',
                    doctorProfileImage: null,
                    doctorClinic: '',
                    doctorClinicImage: null,
                    country: '',
                    postCode: '',
                    address_1: '',
                    address_2: '',
                    telephone: '',
                    password: '',
                },
				confirmPassword: '',
                smsToken: '',
                smsTokenCodes: '',
			};
		},
  	    computed: mapState(['user', 'geo']),
        mounted() {
            if (this.geo.countries.length === 0) {
                this.$store.dispatch('GEO_FETCH_COUNTRIES');
            }
        },
		methods: {
            register() {
                debug('register', this.formData);
                if (!this.isConfirmedSmsToken()) {
                    return window.f7alert('錯誤的驗證碼');
                }
                if (this.formData.password != this.confirmPassword) {
                    return window.f7alert('請確認密碼是否一致');
                }
                if (!this.checkTerm) {
                    return window.f7alert('請同意並接受 美醫用戶協議');
                }

                const formData = new FormData();
                Object.keys(this.formData).map((name) => {
                    if (this.formData[name]) {
                        formData.append(name, this.formData[name]);
                    }
                });

                this.loadingButton = true;
                
                axios({
                    uri: 'register',
                    method: 'post',
                    data: formData,
                    success: (data) => {
                        debug('register success', data);
                        // this.$store.dispatch('USER_LOGIN', data);
                        
                        window.f7alert('已收到您的會員註冊請求</br>請稍等待1~2個工作天為您激活', () => {
                            this.$f7router.navigate('/');
                        });

                    },
                    final: () => {
                        this.loadingButton = false;
                    },
                });
            },
			getSmsToken() {
                if (this.formData.telephone.length < 6) {
                    return window.f7alert('請輸入正確的手機號碼');
                }
				axios({
                    uri: `sms/${this.formData.telephone}`,
                    method: 'get',
                    success: (data) => {
                        
                        this.smsTokenCodes = data.codes;
                        if (data.kmsgid === 0) {
                            window.f7alert(`伺服器未設置電信服務 <br />請直接輸入 驗證碼: ${data.code}`);
                            this.smsToken = data.code;
                        } else {
                            window.f7alert('已送出簡訊驗證碼');
                        }
                        
                    },
                });
            },
            isConfirmedSmsToken() {
                return this.smsToken.length >= 4 && this.smsTokenCodes.indexOf(this.smsToken) >= 0;
            },
            changeCheckbox() {
                this.checkTerm = !this.checkTerm;
                // debug('changeCheckbox', this.checkTerm);
            },
            onFocus(evt) {
                this.openButton = false;
            },
            onBlur(evt) {
                const inputs = this.$f7.$('input[required]');
                // debug(inputs);
                for (let i = 0; i < inputs.length; i++) {
                    const loc = inputs[i];
                    if (!loc.classList.contains('input-with-value')) {
                        this.openButton = false;
                        debug(loc);
                        return;
                    }
                }
                this.openButton = true;
            },
            chooseDoctorFile(evt) {
                evt.stopPropagation();
                try {
                    const input = evt.target.closest('.doctor-file-upload').querySelector('input');
                    input.click();
                } catch(e) {
                    debug('chooseDoctorFile', evt, e.message);
                }
                
            },
            onDoctorFileChange(evt) {
                // evt.preventDefault();
                evt.stopPropagation();
                const name = evt.target.name;
                const file = evt.target.files[0];
                debug('onDoctorFileChange', name, file);
                this.formData[name] = file;
            },
			i18n,
		}
    };
</script>