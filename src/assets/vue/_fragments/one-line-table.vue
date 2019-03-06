<template functional>
    <table class="one-line-table" v-bind="data.attrs" v-on="listeners">
        <tbody>
            <tr>
                <slot />
            </tr>
        </tbody>
    </table>
</template>
<script>
    export default {

    };
</script>
