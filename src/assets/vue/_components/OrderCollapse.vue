<template>
    <div class="order-collapse">
        <collapse-item v-for="order in orders" :key="order.id">
            <div slot="header" class="order-header">
                <div class="header-left">
                    <i18n>訂單編號</i18n><span>: {{order.id}}</span>
                </div>
                <div class="header-right">{{orderStatus(order.status)}}</div>
            </div>
            <div slot="content" class="order-content">
                <table-list>
                    <tr v-for="item in order.products" :key="item.id">
                        <td><ImageLink :image="item.image" /></td>
                        <td>{{item.name}}</td>
                        <td class="nowrap">x {{item.amount}}</td>
                        <td class="nowrap"><num :price="item.price" /></td>
                    </tr>
                </table-list>
            </div>
            <div slot="footer" class="order-footer">
                <one-line-table>
                    <td class="date">{{order.date}}</td>
                    <td><i18n>應付總金額</i18n></td>
                    <td class="total"><num :price="order.total" /></td>
                </one-line-table>
            </div>
        </collapse-item>
    </div>
</template>
<script>
    export default {
        props: {
            orders: Array,
        },
        methods: {
            orderStatus(status) {
                switch(status) {
                    case 1: return '待付款';
                    case 2: return '待發貨';
                    case 3: return '待收貨';
                    case 4: return '失敗';
                    case 5: return '完成';
                    default: return '未知';
                }
            },
        },
    };
</script>
