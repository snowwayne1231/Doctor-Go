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
            @change="onFileChange"
        />
    </div>
</template>
<script>
    import { mapState } from 'vuex';
    import axios from 'assets/js/utils/axios';
    import { getServerApiUploadedImage } from 'assets/js/utils/formatHandlers';

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
                this.$refs.input.click(evt);
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
        },
    };
</script>
