import Vue from 'vue';
import Vuex from 'vuex';
import user from './fake/userModel';
import relation from './fake/relationModel';
import product from './fake/productModel';
import article from './fake/articleModel';
import cart from './fake/cartModel';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        user,
        relation,
        product,
        article,
        cart,
    },
});