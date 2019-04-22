<template>
    <f7-page class="my-setting">
        <header-nav-bar back>
            <i18n slot="title">我的設置</i18n>
        </header-nav-bar>

        <input-form :column="{ '2': [30, 70] }" @focus="onFocus" @blur="onBlur" v-if="isLogin">
            <div>
                <div><i18n>手機號碼</i18n></div>
                <div><input name="phone" :placeholder="i18n('請輸入您的手機號碼')" type="number" v-model="user.telephone" readonly /></div>
            </div>
            <div>
                <div><i18n>名字</i18n></div>
                <div><input name="firstName" :placeholder="i18n('請輸入您的名字')" type="text" v-model="user.firstName" /></div>
            </div>
            <div>
                <div><i18n>姓氏</i18n></div>
                <div><input name="lastName" :placeholder="i18n('請輸入您的姓氏')" type="text" v-model="user.lastName" /></div>
            </div>
            <!-- <div>
                <div><i18n>公司名稱</i18n></div>
                <div><input name="company" :placeholder="i18n('請輸入您的公司名稱')" type="text" /></div>
            </div> -->
            <div>
                <div><span>E-mail</span></div>
                <div><input name="email" :placeholder="i18n('請輸入您的Email')" type="email" v-model="user.email" /></div>
            </div>
            
            <div>
                <div><i18n>郵遞區號</i18n></div>
                <div><input name="postCode" :placeholder="i18n('請輸入您的郵遞區號')" type="number" v-model="user.address.postcode" /></div>
            </div>
            <div>
                <div><i18n>地區/鄉鎮</i18n></div>
                <div><input name="city" :placeholder="i18n('請輸入地區/鄉鎮/城市')" type="text" v-model="user.address.address_1" /></div>
            </div>
            <div>
                <div><i18n>地址</i18n></div>
                <div><input name="address" :placeholder="i18n('請輸入詳細地址')" type="text" v-model="user.address.address_2" /></div>
            </div>
            <div>
                <div><i18n>醫師執照</i18n></div>
                <div><input name="doctorProfile" :placeholder="i18n('請輸入您的醫師執照編號')" type="text" v-model="user.doctor_profile" /></div>
            </div>
            <div class="doctor-file-upload">
                <div><i18n>執照圖檔</i18n>
                    <input
                        type="file"
                        name="doctor_profile_image"
                        accept="image/*"
                        hidden
                        @change="onDoctorFileChange"
                    />
                </div>
                <div>
                    <input v-if="doctor_profile_image" type="text" readonly :value="doctor_profile_image.name" />
                    <img v-else
                        class="server-image"
                        :src="getServerApiUploadedImage(user.doctor_profile_image_id)"
                        @click="chooseDoctorFile" />
                </div>
            </div>
            <div>
                <div><i18n>診所執照</i18n></div>
                <div><input name="doctorClinic" :placeholder="i18n('請輸入您的診所開業執照編號')" type="text" v-model="user.doctor_clinic" /></div>
            </div>
            <div class="doctor-file-upload">
                <div><i18n>診所圖檔</i18n>
                    <input
                        type="file"
                        name="doctor_clinic_image"
                        accept="image/*"
                        hidden
                        @change="onDoctorFileChange"
                    />
                </div>
                <div>
                    <input v-if="doctor_clinic_image" type="text" readonly :value="doctor_clinic_image.name" />
                    <img v-else
                        class="server-image"
                        :src="getServerApiUploadedImage(user.doctor_clinic_image_id)" 
                        @click="chooseDoctorFile"/>
                </div>
            </div>
        </input-form>

        <fixed-button v-if="openButton" @click="onClickSubmit">
            <i18n>確認修改</i18n>
        </fixed-button>
    </f7-page>
</template>


<script>
    import { mapState, mapGetters } from 'vuex';
    import i18n from 'assets/js/utils/i18n';
    import { getServerApiUploadedImage } from 'assets/js/utils/formatHandlers';
    import axios from 'assets/js/utils/axios';
    

    export default {
		data () {
			return {
                openButton: true,
                doctor_profile_image: null,
                doctor_clinic_image: null,
			};
		},
  	    computed: {
            ...mapState(['user']),
            ...mapGetters(['isLogin']),
        },
        mounted() {
            debug('mysetting', this);
        },
		methods: {
			onClickSubmit() {
                debug(this.user);
                // self.userLogged({name: "User", id: "#1"});
                const data = {
                    id: this.user.id,
                    lastname: this.user.lastName,
                    firstname: this.user.firstName,
                    email: this.user.email,
                    doctor_profile: this.user.doctor_profile,
                    doctor_profile_image: this.doctor_profile_image,
                    doctor_clinic: this.user.doctor_clinic,
                    doctor_clinic_image: this.doctor_clinic_image,
                    postcode: this.user.address.postcode,
                    address_1: this.user.address.address_1,
                    address_2: this.user.address.address_2,
                    telephone: this.user.telephone,
                };

                const formData = new FormData();
                Object.keys(data).map((name) => {
                    data[name] && formData.append(name, data[name]);
                });

                debug('formData', formData);

                axios({
                    uri: 'usersetting',
                    method: 'post',
                    data: formData,
                    success: (data) => {
                        // debug('editUserInfo success', data);
                        window.f7alert('修改成功');
                        this.$store.dispatch('USER_FETCH_USER_INFO');

                        this.$f7router.back();
                    },
                });

            },
            onFocus(evt) {
                this.openButton = false;
            },
            onBlur(evt) {
                this.openButton = true;
            },
            i18n,
            getServerApiUploadedImage,
            chooseDoctorFile(evt) {
                const input = evt.target.closest('.doctor-file-upload').querySelector('input');
                input && input.click(evt);
                // this.$refs.doctorFile.click(evt);
            },
            onDoctorFileChange(evt) {
                const name = evt.target.name;
                const file = evt.target.files[0];
                debug('onDoctorFileChange', name, file);
                // this.formData[name] = file;
                this[name] = file;
            },
		}
    };
</script>