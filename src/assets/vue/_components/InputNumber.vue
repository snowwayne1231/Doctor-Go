<template>
    <div class="input-number">
        <div class="inner">
            <dt class="fa fa-minus middle i-n-c" @click="minus" />
            <input
                class="i-n-c number"
                type="number"
                ref="input"
                @input="updated"
                :value="value"
                :min="minNumber"
                :max="maxNumber"
            />
            <dt class="fa fa-plus middle i-n-c" @click="plus" />
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            value: Number,
            min: String,
            max: String,
        },
        computed: {
            minNumber() {
                return parseInt(this.min || 0);
            },
            maxNumber() {
                return parseInt(this.max || 999);
            },
        },
        methods: {
            plus() {
                const next = this.selfNumber(1);
                Number.isInteger(next) && this.$emit('input', next);
            },
            minus() {
                const next = this.selfNumber(-1);
                Number.isInteger(next) && this.$emit('input', next);
            },
            updated() {
                const next = this.selfNumber();
                Number.isInteger(next) && this.$emit('input', next);
            },
            selfNumber(mutate) {
                let next = parseInt(this.$refs.input.value) + (mutate || 0) || 0;
                switch (true) {
                    case next < this.minNumber:
                        next = this.minNumber;
                        break;
                    case next > this.maxNumber:
                        next = this.maxNumber;
                        break;
                    default:
                }
                this.$refs.input.value = next;
                return next;
            },
        },
    };
</script>
