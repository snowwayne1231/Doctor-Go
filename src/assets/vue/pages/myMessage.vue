<template>
    <f7-page class="my-message">
        <header-nav-bar back>
            <i18n slot="title">我的訊息</i18n>
        </header-nav-bar>

        <div class="inner-content">
            <table-list>
                <tr v-for="data in messages" :key="data.id">
                    <td class="type">[商品消息]</td>
                    <td class="text">{{data.msg}}</td>
                </tr>
            </table-list>
        </div>
    </f7-page>
</template>


<script>
    import { mapState, mapActions } from 'vuex';
    import i18n from 'assets/js/utils/i18n';
    

    export default {
		data () {
			return {
                messages: [
                    { id: 1, type: 1, status: 1, msg: '訊息!!!!!!!!@#$' },
                    { id: 2, type: 1, status: 1, msg: '可以唷!! 特價購買' },
                    { id: 3, type: 1, status: 1, msg: '您的貨品已經送達並簽收' },
                    { id: 4, type: 1, status: 1, msg: '您的商品已寄送到指定地址，但無人接收。請在七天內回覆或聯絡客服告知處理，謝謝' },
                    { id: 5, type: 1, status: 1, msg: '已收到您的貨款感謝您的評價' },
                ],
			};
		},
  	    computed: mapState({
			user: state => { return state.user },
		}),
		methods: {
			...mapActions(['userLogged'])
		}
    };
</script>