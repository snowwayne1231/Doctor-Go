<template>
    <div class="input-check" :class="{checked: value}" @click="change">
        <div class="inner">
            <dt
                class="fa"
                :class="{
                    'fa-check': value,
                }"
            />
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            value: Boolean,
        },
        methods: {
            change() {
                this.$emit('input', !this.value);
            },
        },
    };
</script>
