<template>
    <div class="loading-bar">
        <div class="percentage-bar" ref="percentageBar" :class="{ loading: loading }" :style="{ width: `${percent}%` }"/>
    </div>
</template>
<script>
    import { mapState } from 'vuex';

    export default {
        data() {
            return {
                percent: 100,
                defaultTimeout: 500,
                fakeMaxPercent: 90,
            };
        },
        computed: {
            ...mapState(['axios']),
            loading(self) {
                if (self.axios.isLoading) {
                    self.percent === 100 && self.triggerStartLoading();
                } else if (self._isMounted){
                    self.doneLoading();
                }
                return self.axios.isLoading && self.percent > 0;
            },
        },
        mounted() {
            this.increaseTimer = null;
        },
        methods: {
            triggerStartLoading() {
                this.percent = 0;
                this.increaseTimer = window.setTimeout(this.increaseFakePercent, this.defaultTimeout);
            },
            doneLoading() {
                this.percent = 100;
                window.clearTimeout(this.increaseTimer);
                this.increaseTimer = null;
            },
            increaseFakePercent() {
                if (this.percent < this.fakeMaxPercent) {
                    const operation = Math.floor(this.defaultTimeout / this.axios.averageMS * 100);
                    // const operation = 5;
                    this.percent = Math.min(this.fakeMaxPercent, this.percent + operation);
                    this.increaseTimer = window.setTimeout(this.increaseFakePercent, this.defaultTimeout);
                }
            },
        },
    };
</script>
