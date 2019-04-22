<template>
    <div class="status-div" :class="{ loading: isLoading }">
        <div class="loading-div" v-if="isLoading">
            <dd class="fa fa-spinner" />
        </div>
        <slot v-else />
    </div>
</template>
<script>
    import { mapState } from 'vuex';

    export default {
        data() {
            return {
                defaultTimeout: 500,
            };
        },
        computed: {
            ...mapState(['axios']),
            isLoading(self) {
                return self.axios.isLoading || self.percent == 0;
            },
        },
        mounted() {
            this.increaseTimer = null;
        },
        methods: {
            
        },
    };
</script>
