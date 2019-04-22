<template>
    <div class="news-card">
        <div class="list" ref="list" :class="{loading: loading}">
            <dl v-for="li in list" :key="li.id" class="item"> 
                <dd class="title" :title="li.title">{{li.title}}</dd>
                <dd class="type"><i>{{li.type}}</i></dd>
                <dd class="headline" :title="li.headline">{{li.headline}}</dd>
            </dl>
        </div>
        <div class="more inline-middle">
            <f7-link href="/news/"><i18n>更多</i18n></f7-link>
        </div>
    </div>
</template>
<script>
    import { mapState } from 'vuex';

    export default {
        data() {
            return {
                loading: true,
            };
        },
        computed: {
            ...mapState(['ad']),
            list() {
                return this.ad.news;
            },
        },
        mounted() {
            this.init();
        },
        beforeDestroy() {
            clearInterval(this._timer);
        },
        methods: {
            init() {
                this.$store.dispatch('AD_FETCH_NEWS').then(() => {
                    this._pointer = 0;
                    this.previousElement = null;
                    setTimeout(this.interval, 100);
                    this._timer = setInterval(this.interval, 5000);
                    this.loading = false;
                });
            },
            interval() {
                if (!this.$refs || !this.$refs.list) {
                    return;
                }

                const childNodes = this.$refs.list.childNodes;
                if (!childNodes) { return }

                const node = childNodes[this._pointer];
                if (node) {
                    if (this.previousElement) {
                        this.previousElement.classList.remove('current');
                        // this.previousElement.classList.add('previous');
                    }
                    node.classList.add('current');
                    
                    this._pointer = this._pointer >= childNodes.length - 1 ? 0 : this._pointer + 1;
                    this.previousElement = node;
                } else {
                    this._pointer = 0;
                }
            },
        },
    };
</script>
