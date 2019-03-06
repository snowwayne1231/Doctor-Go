<template>
    <dd class="date-time">
        {{show}}
    </dd>
</template>
<script>
    export default {
        props: ['value'],
        computed: {
            show() {
                let date;
                const type = typeof this.value;
                switch (type) {
                    case 'string': case 'number':
                        date = new Date(this.value);
                        break;
                    case 'object':
                        date = this.value instanceof Date ? this.value : new Date();
                        break;
                    default:
                        date = new Date();
                }
                // debug('DateTime', this.value, type, date);
                return isNaN(date.getTime())
                    ? '---'
                    : `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
            },
        },
    };
</script>
