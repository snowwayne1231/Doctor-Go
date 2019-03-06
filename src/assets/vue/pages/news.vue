<template>
    <f7-page id="news">
        <header-nav-bar back>
            <i18n slot="title">
                最新消息
            </i18n>
        </header-nav-bar>

        <div class="inner-content">
            <collapse-item v-for="data in news" :key="data.id">
                <div slot="header" class="inline-middle nowrap">
                    <span class="type middle">{{data.type}}</span>
                    <span class="text middle">{{data.text}}</span>
                </div>
                <div slot="content" v-if="data.content">
                    {{data.content}}
                </div>
            </collapse-item>
        </div>

    </f7-page>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    

    export default {
		data () {
			return {
                news: [
                    { id:1, type: '頭條', text: '2月滿額送好禮', content: '2月滿額送好禮,2月滿額送好禮,2月滿額送好禮,2月滿額送好禮,2月滿額送好禮,' },
                    { id:2, type: '頭條', text: '2月滿額送好禮', content: '有些內容' },
                    { id:3, type: '頭條', text: '2月滿額送好禮', content: '是有內容的' },
                ],
			};
        },
        methods: {
            
        },
    };
</script>