<template>
    <f7-page id="collective-buying-single">
        <header-nav-bar back>
            <i18n slot="title" :text="title"></i18n>
        </header-nav-bar>

        <div class="inner-content">
            <div class="details">
                <table-list>
                    <tr>
                        <td colspan="2"><ImageLink class="product-image" :image="productDetail.image" /></td>
                    </tr>
                    <tr>
                        <td><i18n>產品名稱</i18n></td>
                        <td>{{productDetail.name}}</td>
                    </tr>
                    <tr>
                        <td><i18n>價格</i18n></td>
                        <td>{{productDetail.price}}</td>
                    </tr>
                    <tr>
                        <td><i18n>發起人</i18n></td>
                        <td>                            
                            <ImageLink class="personal-image" :image="promoterImage" />
                            <span>{{promoterName}}</span>
                        </td>
                    </tr>
                    <tr>
                        <td><i18n>起始日期</i18n></td>
                        <td><DateTime :value="startDate"/></td>
                    </tr>
                    <tr>
                        <td><i18n>結束日期</i18n></td>
                        <td><DateTime :value="endDate"/></td>
                    </tr>
                    <tr>
                        <td><i18n>團購人數</i18n></td>
                        <td><num>{{participant.length}}</num></td>
                    </tr>
                </table-list>
            </div>

            <div class="participant">
                
            </div>
        </div>
        <fixed-button :show="true">
            加入團購
        </fixed-button>
    </f7-page>
</template>


<script>
    import { mapState } from 'vuex';

    export default {
		data () {
			return {
                title: '團購產品',
                id: 2,
                promoterId: 2,
                promoterName: '孫升升',
                promoterImage: 'static/images/face.png',
                productId: 12,
                productName: '水龍捲皮膚氫淨機',
                productImage: 'static/images/products/el-650x650.png',
                startDate: '2019-03-04',
                endDate: '2019-03-15',
                participant: [
                    { id: 1, name: '小朋友', image: 'static/images/face.png', }
                ],
			};
        },
        computed: {
            ...mapState(['product']),
            productDetail() {
                return this.product.summarylist.find(e => e.id == this.productId);
            },
        },
		methods: {
			
		},
    };
</script>