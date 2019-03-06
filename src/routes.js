import store from './assets/vuex/storage.js';

import Home from './assets/vue/pages/home/home.vue';
import TabHome from './assets/vue/pages/home/tabHome.vue';
import TabCatalog from './assets/vue/pages/home/tabCatalog.vue';
import TabCart from './assets/vue/pages/home/tabCart.vue';
import TabArticle from './assets/vue/pages/home/tabArticle.vue';
import TabMy from './assets/vue/pages/home/tabMy.vue';
import Registration from './assets/vue/pages/registration.vue';
import Login from './assets/vue/pages/login.vue';
import Prodcut from './assets/vue/pages/product.vue';
import Article from './assets/vue/pages/article.vue';
import MyOrder from './assets/vue/pages/myOrder/myOrder.vue';
import MyFavoriteArticle from './assets/vue/pages/myFavoriteArticle';
import MyFavoriteProduct from './assets/vue/pages/myFavoriteProduct';
import MySetting from './assets/vue/pages/mySetting';
import MySettingPassword from './assets/vue/pages/mySettingPassword';
import MyMessage from './assets/vue/pages/MyMessage';
import Search from './assets/vue/pages/search';
import News from './assets/vue/pages/news';
import AboutUs from './assets/vue/pages/aboutus';
import ContactUs from './assets/vue/pages/contactus';
import ProductListFilter from './assets/vue/pages/productListFilter';
import ProductBrand from './assets/vue/pages/productBrand';
import ForgetPassword from './assets/vue/pages/forgetPassword';
import TermUser from './assets/vue/pages/termUser';
import ArticlePublication from './assets/vue/pages/articlePublication';
import CollectiveBuying from './assets/vue/pages/collectiveBuying';
import CollectiveBuyingSingle from './assets/vue/pages/collectiveBuyingSingle';
import RedeemingCenter from './assets/vue/pages/redeemingCenter';
import Checkout from './assets/vue/pages/checkout';

const checkAuthrization = (component) => {
    return (to, from, resolve, reject) => {
        if (store.getters.isLogin) {
            resolve({component: component});
        } else {
            resolve({component: Login});
        }
    };
};

const redirectWhenAlreadyLogin = (component) => {
    return (to, from, resolve, reject) => {
        if (store.getters.isLogin) {
            resolve({component: MySetting});
        } else {
            resolve({component: component});
        }
    };
};


export default [ 
    {
        path: '/login/',
        // component: Login,
        async: redirectWhenAlreadyLogin(Login),
    },
    {
        path: '/registration/',
        // component: Registration,
        async: redirectWhenAlreadyLogin(Registration),
    },
    {
        path: '/aboutus/',
        component: AboutUs,
    },
    {
        path: '/contactus/',
        component: ContactUs,
    },
    {
        path: '/product/',
        // component: Prodcut,
        async: checkAuthrization(Prodcut),
    },
    {
        path: '/productlistfilter/:catalog',
        // component: ProductListFilter,
        async: checkAuthrization(ProductListFilter),
    },
    {
        path: '/productbrand/',
        async: checkAuthrization(ProductBrand),
    },
    {
        path: '/productbrand/:brand',
        // component: ProductListFilter,
        async: checkAuthrization(ProductListFilter),
    },
    {
        path: '/articlepublication/:publication',
        async: checkAuthrization(ArticlePublication),
    },
    {
        path: '/article/:article',
        component: Article,
    },
    {
        path: '/news/',
        component: News,
    },
    {
        path: '/collectivebuying/',
        async: checkAuthrization(CollectiveBuying),
    },
    {
        path: '/collectivebuying/:id',
        async: checkAuthrization(CollectiveBuyingSingle),
    },
    {
        path: '/redeemingCenter/',
        async: checkAuthrization(RedeemingCenter),
    },
    {
        path: '/checkout/',
        async: checkAuthrization(Checkout),
    },
    {
        path: '/search/',
        // component: Search,
        async: checkAuthrization(Search),
    },
    {
        path: '/term/user',
        component: TermUser,
    },
    {
        path: '/myfavorite/article',
        // component: MyFavoriteArticle,
        async: checkAuthrization(MyFavoriteArticle),
    },
    {
        path: '/myfavorite/product',
        // component: MyFavoriteProduct,
        async: checkAuthrization(MyFavoriteProduct),
    },
    {
        path: '/forgetpassword/',
        component: ForgetPassword,
    },
    {
        path: '/mysetting/',
        // component: MySetting,
        async: checkAuthrization(MySetting),
    },
    {
        path: '/mysetting/password',
        // component: MySettingPassword,
        async: checkAuthrization(MySettingPassword),
    },
    {
        path: '/mymessage/',
        // component: MyMessage,
        async: checkAuthrization(MyMessage),
    },
    {
        path: '/myorder/',
        component: MyOrder,
        // async: checkAuthrization(MyOrder),
        // keepAlive: true,
        tabs: [
            {
                path: '/tab-before-pay',
                id: 'my-order-before-pay',
            },
            {
                path: '/tab-before-ship',
                id: 'my-order-before-ship',
            },
            {
                path: '/tab-wait',
                id: 'my-order-wait',
            },
            {
                path: '/tab-finish',
                id: 'my-order-finish',
            },
        ],
    },
    {
        name: 'Home',
        path: '/',
        component: Home,
        keepAlive: true,
        tabs: [
            {
                path: '/',
                id: 'tab-home',
                component: TabHome,
            },
            {
                path: '/tab-catalog',
                id: 'tab-catalog',
                component: TabCatalog,
            },
            {
                path: '/tab-cart',
                id: 'tab-cart',
                component: TabCart,
            },
            {
                path: '/tab-article',
                id: 'tab-article',
                component: TabArticle,
            },
            {
                path: '/tab-my',
                id: 'tab-my',
                component: TabMy,
            },
        ],
    },
    {
        path: '(.*)',
        // keepAlive: true,
        redirect: '/',
    },
];
