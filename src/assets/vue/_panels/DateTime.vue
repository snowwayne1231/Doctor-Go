<template>
    <dd class="date-time">
        {{show}}
    </dd>
</template>
<script>
    export default {
        props: ['value', 'format'],
        computed: {
            show() {
                let date;
                const type = typeof this.value;
                switch (type) {
                    case 'string': case 'number':
                        date = this.value.match('/\d{4}.\d{1,2}.\d{1,2}.\d+/') ? new Date(this.value.replace('/-/g', '/')) : new Date(this.value);
                        break;
                    case 'object':
                        date = this.value instanceof Date ? this.value : new Date();
                        break;
                    default:
                        date = new Date();
                }
                // debug('DateTime', this.value, type, date);
                const year = date.getFullYear();
                const month = date.getMonth();
                const day = date.getDate();
                const hour = date.getHours();
                const minute = date.getMinutes();

                if (isNaN(date.getTime())) {
                    return '---';
                } else if (this.format) {
                    return this.format
                        .replace(/y+/i, year)
                        .replace(/m+/i, month)
                        .replace(/d+/i, day)
                        .replace(/h+/i, hour);
                } else {
                    return `${year}/${month}/${day} ${hour}:${minute}`;
                }
                
            },
        },
    };
</script>
