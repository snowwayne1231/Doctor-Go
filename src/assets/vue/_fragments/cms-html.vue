<template>
    <div class="cms-html" v-html="html">
        
    </div>
</template>
<script>
    export default {
        props: {
            html: String,
        },
    };
</script>
