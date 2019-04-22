import Vue from 'vue';
import Vuex from 'vuex';
import user from './models/userModel';
import relation from './fake/relationModel';
import product from './models/productModel';
import article from './models/articleModel';
import cart from './models/cartModel';
import axios from './models/axiosModel';
import geo from './models/geoModel';
import ad from './models/adModel';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        user,
        relation,
        product,
        article,
        cart,
        axios,
        geo,
        ad,
    },
});