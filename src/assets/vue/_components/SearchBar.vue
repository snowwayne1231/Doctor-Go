<template>
    <div class="search-bar">
        <div class="search-bar-input-wrap">
            <i class="fa fa-search" />
            <input
                type="search"
                class=""
                @input="onChangeInput"
                @blur="onBlur"
                @focus="onFocus"
                :value="value"
                :placeholder="placeholder || '搜尋商品'"
                ref="input" />
        </div>
    </div>
</template>
<script>

    export default {
        props: {
            focus: Boolean,
            value: String,
            placeholder: String,
            change: Function,
            blur: Function,
        },
        data() {
            return {
                
            };
        },
        mounted() {
            this.localValue = this.value;
        },
        updated() {
            if (this.localValue != this.value) {
                this.localValue = this.value;
                this.change && this.change(this.value);
            }
        },
        methods: {
            focusInput() {
                this.$refs.input.focus();
            },
            onChangeInput(evt) {
                const value = evt.target.value;
                this.$emit('input', value);
                this.$emit('change', evt);
            },
            onBlur(evt) {
                this.$emit('blur', evt);
                this.blur && this.blur(evt);
            },
            onFocus(evt) {
                this.$emit('focus', evt);
                this.focus && this.focus(evt)
            },
        },
    };
</script>
