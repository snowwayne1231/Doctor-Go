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
            hidden
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
                if (this.isBrowser) {
                    this.$refs.input.click(evt);
                } else {
                    this.getPicture();
                }
                
            },
            onFileChange(evt) {
                const name = evt.target.name;
                const file = evt.target.files[0];
                if (!file) return;
                this.upfile(file);
            },
            getPicture() {
                const uploadFn = this.upfile;
                navigator.camera.getPicture(
                    function success(imageURI){
                        // plugins.crop(function success(url) {
                        //     url = url.split('?');
                        
                        // }, function fail(err) {
                        //     debug(err);
                        // }, imageURI, {quality: 60});

                        window.resolveLocalFileSystemURL(imageURI, 
                            function(fileEntry){
                                debug("got image file entry: " , fileEntry);
                                // uploadFn(fileEntry.file());
                                readBinaryFile(fileEntry);
                                function readBinaryFile(fileEntry) {

                                    fileEntry.file(function (file) {
                                        var reader = new FileReader();

                                        reader.onloadend = function() {
                                            // debug("Successful file write: " + this.result);
                                            var blob = new Blob([new Uint8Array(this.result)], { type: "image/jpeg" });
                                            uploadFn(blob);
                                        };

                                        reader.readAsArrayBuffer(file);
                                    });
                                }
                                
                            },
                            function(){
                                window.f7alert('上傳圖片錯誤');
                            }
                        );
                    },
                    function fail(message){
                        navigator.notification.alert("操作失敗，原因：" + message, null, "警告");
                    },
                    {
                        //拍照
                        // destinationType: Camera.DestinationType.FILE_URI,

                        //相冊選圖
                        mediaType: Camera.MediaType.PICTURE,
                        // sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
                        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                        quality: 50,
                        allowEdit: true,
                        encodingType: Camera.EncodingType.JPEG,
                    }
                );
                return;
                // window.imagePicker.getPictures(
                //     function(results) {
                //         for (var i = 0; i < results.length; i++) {
                //             var uri = results[i];
                            
                //             // uploadFn(uri);
                //         }
                //     }, function (error) {
                //         debug('Error: ' + error);
                //     },
                //     {
                //         maximumImagesCount: 1,
                //         quality: 50,
                //     }
                // );
            },
            upfile(file) {
                debug('upfile file', file);
                const user = this.user;
                const data = {
                    id: user.id,
                    telephone: user.telephone,
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
        },
    };
</script>
