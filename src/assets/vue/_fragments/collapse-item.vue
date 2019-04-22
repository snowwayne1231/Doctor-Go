<template>
    <div class="collapse-item" :class="{open: collapseOpen, 'no-content': noContent}">
        <div class="collapse-header" @click="toggle">
            <i class="fa fa-angle-right"/>
            <slot name="header"/>
        </div>
        <div class="collapse-content">
            <slot name="content" />
        </div>
        <div class="collapse-footer">
            <slot name="footer" />
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            open: Boolean,
        },
        data() {
            return {
                collapseOpen: this.open,
            };
        },
        mounted() {
            // debug(this);
        },
        computed: {
            noContent(self) {
                return !self.$slots.content;
            },
        },
        methods: {
            toggle() {
                if (!this.noContent) {
                    this.collapseOpen = !this.collapseOpen;
                }
            },
        },
    };
</script>
