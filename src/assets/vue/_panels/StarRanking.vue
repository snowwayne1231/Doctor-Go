<template>
    <div class="star-ranking">
        <dd v-for="idx in 5" :key="idx" class="fa" :class="iconClass(idx)" />
        <dd v-if="!hideNumber">{{score}}</dd>
    </div>
</template>
<script>
    export default {
        props: {
            score: Number,
            hideNumber: Boolean,
        },
        methods: {
            iconClass(i) {
                switch(true) {
                    case i <= this.score:
                        return 'fa-star';
                    case i === Math.round(this.score):
                        return 'fa-star-half-o';
                    default:
                        return 'fa-star-o';
                }
            },
        },
    };
</script>
