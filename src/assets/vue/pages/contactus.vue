<template>
    <f7-page id="contact-us">
        <header-nav-bar back>
            <i18n slot="title">聯絡我們</i18n>
        </header-nav-bar>

        <img class="logo" src="../../images/zh_tw/logo.jpg" />

        <div class="inner-content">
            <table-list>
                <tr>
                    <td class="center">
                        <div class="icon fa fa-phone middle" />
                    </td>
                    <td>
                        <div>
                            <strong>電話</strong><br>
                            <a href="callto:02-27007409">02-27007409</a>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="center">
                        <div class="icon fa fa-key middle" />
                    </td>
                    <td>
                        <div>
                            <strong>營業時間</strong><br>
                            每週7天，從上午9點到晚上7點	
                        </div>
                    </td>
                </tr>

            </table-list>
        </div>
        
    </f7-page>
</template>


<script>

    export default {
		data () {
			return {
                
			};
		},
		methods: {
			
		}
    };
</script>