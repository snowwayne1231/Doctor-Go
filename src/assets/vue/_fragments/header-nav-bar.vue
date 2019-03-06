<template>
    <div class="header-nav-bar">
        <div class="header-content">
            <div class="left" >
                <f7-link v-if="back" slot="left" back icon="fa fa-angle-left" />
                <slot name="left"/>
            </div>
            <div class="title" ><slot name="title"/></div>
            <div class="right" ><slot name="right"/></div>
        </div>
        <div class="header-below">
            <LoadingBar />
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            back: Boolean,
        },
        mounted() {
            // debug(this);
        },
    };
</script>
