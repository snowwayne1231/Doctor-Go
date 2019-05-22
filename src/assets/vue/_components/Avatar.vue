<template>
    <div class="avatar">
        <dd
            class="image-wrapper background-image-cover"
            :style="{backgroundImage: `url(${avatarURL})`}"
        />
        <i class="fa fa-camera" @click="onClickAvatar" />
        <input
            ref="input"
            type="file"
            name="avatar"
            accept="image/*"
            class="server-input-file"
            @change="onFileChange"
        />
    </div>
</template>
<script>
    import { mapState, mapGetters } from 'vuex';
    import axios from 'assets/js/utils/axios';
    import { getServerApiUploadedImage } from 'assets/js/utils/formatHandlers';
    import { mainServerURL } from 'config-env';

    export default {
        props: {
            
        },
        data() {
            return {
                // avatarFile: null,
            };
        },
        computed: {
            ...mapState(['user']),
            ...mapGetters(['isBrowser']),
            avatarURL() {
                return this.user.avatar_url
                    ? String(this.user.avatar_url).match(/http/i)
                        ? this.user.avatar_url
                        : getServerApiUploadedImage(this.user.avatar_url)
                    : 'static/images/face.png';
            },
        },
        mounted() {
            
        },
        methods: {
            onClickAvatar(evt) {
                // 
                if (this.isBrowser || true) {
                    this.$refs.input.click(evt);
                } else {
                    this.getPicture();
                }
                
            },
            onFileChange(evt) {
                const name = evt.target.name;
                const file = evt.target.files[0];
                if (!file) return;
                // this.avatarFile = file;
                const data = {
                    id: this.user.id,
                    telephone: this.user.telephone,
                    avatar_image: file,
                };
                const formData = new FormData();
                Object.keys(data).map((name) => {
                    formData.append(name, data[name]);
                });
                
                axios({
                    uri: 'usersetting',
                    method: 'post',
                    data: formData,
                    success: (data) => {
                        this.$store.commit('USER_UPDATE_STATE', data);
                    },
                });
            },
            getPicture() {
                const uploadFn = this.upfile;
                navigator.camera.getPicture(
                    function success(imageURI){
                        plugins.crop(function success(url) {
                            url = url.split('?');
                            uploadFn(url[0]);
                        }, function fail(err) {
                            debug(err);
                        }, imageURI, {quality: 60});
                    },
                    function fail(message){
                        navigator.notification.alert("操作失敗，原因：" + message, null, "警告");
                    },
                    {
                        //拍照
                        // destinationType: Camera.DestinationType.FILE_URI,

                        //相冊選圖
                        // mediaType: Camera.MediaType.PICTURE,
                        sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
                    }
                );

            },
            upfile(fileURL) {
                const reader = new FileReader();
                debug('fileURL', fileURL);
                reader.onloadend = function(evt) {
                    debug('onloadend', evt);
                };
                reader.readAsDataURL(fileURL);
            },
            //上傳圖片
            upFileTransfer( fileURL ) {
                var uri = encodeURI(mainServerURL + "api/usersetting");    //服務器接收地址

                var options = new FileUploadOptions();
                options.params = {
                    id: this.user.id,
                    telephone: this.user.telephone,
                };
                options.fileKey="avatar_image";    //表單元素的名稱。默認爲file
                options.fileName=fileURL.substr(fileURL.lastIndexOf('/')+1);    //在服務器上保存文件時要使用的文件名。默認爲image.jpg
                // options.mimeType="text/plain";    //要上傳的數據的MIME類型。默認爲image/jpeg。
                options.headers = {'X-Auth-Token': this.user.token};

                var ft = new FileTransfer();
                // 上傳進度
                // ft.onprogress = function(progressEvent) {
                //     if (progressEvent.lengthComputable) {
                //         loadingStatus.setPercentage(progressEvent.loaded / progressEvent.total);
                //     } else {
                //         loadingStatus.increment();
                //     }
                // };

                // ft.upload(fileURL, uri,
                //     function win(r) {
                //         console.log('win', r);
                //     },
                //     function fail(error) {
                //         window.f7alert("An error has occurred: Code = " + error.code);
                //         debug('fail ft.upload', error);
                //     }, options
                // );
            },
        },
    };
</script>
