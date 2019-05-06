import {replaceObject} from 'assets/js/utils/formatHandlers';
import axios from 'assets/js/utils/axios';

export default {
    state: {
        id: 0,
        group_id: 0,
        store_id: 0,
        token: '',
        avatar_url: null,
        firstName: '',
        lastName: '',
        telephone: '',
        fax: '',
        salt: '',
        point: 0,
        doctor_clinic: '',
        doctor_clinic_image_id: 0,
        doctor_profile: '',
        doctor_profile_image_id: 0,
        email: '',
        watchlist_products: [],
        watchlist_articles: [],
        address: {},
    },

    getters: {
        isLogin: (state) => {
            // return true;
            return !!state.token;
        },
        isBrowser: () => {
            return !(window.device && window.device.uuid);
        },
    },

    actions: {
        USER_LOGIN ({commit, dispatch}, user) {
            
            commit('USER_UPDATE_STATE', user);

            dispatch('USER_FETCH_WATCHLIST_PRODUCTS');
            dispatch('USER_FETCH_WATCHLIST_ARTICLES');
            dispatch('CART_FETCH_ALL');
        },
        USER_LOGOUT ({commit}) {
            localStorage.removeItem('user');
            axios({
                uri: 'logout',
                method: 'put',
            });
            commit('USER_CLEARN_STATE');
        },
        USER_FETCH_USER_INFO({commit, dispatch}, token) {
            token && commit('USER_UPDATE_STATE', { token });
            return axios({
                uri: 'user',
                success: (data) => {
                    dispatch('USER_LOGIN', data);
                },
            });
        },
        USER_FETCH_WATCHLIST_PRODUCTS({commit}) {
            return axios({
                uri: 'authorization/get/CustomerWatchlist',
                success: (data) => {
                    commit('USER_UPDATE_WATCHLIST_PRODUCTS', data);
                },
            });
        },
        USER_FETCH_WATCHLIST_ARTICLES({commit}) {
            return axios({
                uri: 'authorization/get/WatchlistArticle',
                success: (data) => {
                    commit('USER_UPDATE_WATCHLIST_ARTICLES', data);
                },
            });
        },
        USER_STORE_WATCHLIST_PRODUCT({commit}, productId) {
            return axios({
                method: 'post',
                data: { id: productId },
                uri: 'watchlist/product',
                success: (data) => {
                    commit('USER_UPSERT_WATCHLIST_PRODUCT', data);
                },
            });
        },
        USER_REMOVE_WATCHLIST_PRODUCT({commit}, productId) {
            return axios({
                method: 'delete',
                data: { id: productId },
                uri: 'watchlist/product',
                success: (data) => {
                    commit('USER_DELETE_WATCHLIST_PRODUCT_BY_ID', productId);
                },
            });
        },
        USER_STORE_WATCHLIST_ARTICLE({commit}, id) {
            return axios({
                method: 'post',
                data: { id },
                uri: 'watchlist/article',
                success: (data) => {
                    commit('USER_UPSERT_WATCHLIST_ARTICLE', data);
                },
            });
        },
        USER_REMOVE_WATCHLIST_ARTICLE({commit}, id) {
            return axios({
                method: 'delete',
                data: { id },
                uri: 'watchlist/article',
                success: (data) => {
                    commit('USER_DELETE_WATCHLIST_ARTICLE_BY_ID', id);
                },
            });
        },
    },

    mutations: {
        USER_UPDATE_STATE (state, payload) {
            
            replaceObject(state, {
                id: payload.id,
                token: payload.token,
                avatar_url: payload.avatar_url,
                email: payload.email || payload.Email,
                firstName: payload.firstname || payload.firstName,
                lastName: payload.lastname || payload.lastName,
                telephone: payload.telephone,
                point: payload.point,
                doctor_clinic: payload.doctor_clinic || payload.doctorClinic,
                doctor_clinic_image_id: payload.doctor_clinic_image_id || payload.doctorClinicImage,
                doctor_profile: payload.doctor_profile || payload.doctorProfile,
                doctor_profile_image_id: payload.doctor_profile_image_id  || payload.doctorProfileImage,
                address: payload.address || {},
            });

            localStorage.setItem('user', JSON.stringify(state));
        },
        USER_UPDATE_WATCHLIST_PRODUCTS(state, payload) {
            state.watchlist_products = payload;
        },
        USER_UPDATE_WATCHLIST_ARTICLES(state, payload) {
            state.watchlist_articles = payload;
        },
        USER_UPSERT_WATCHLIST_PRODUCT(state, payload) {
            const idx = state.watchlist_products.findIndex(e => e.product_id == payload.product_id);
            if (idx >= 0) {
                state.watchlist_products[idx] = payload;
            } else {
                state.watchlist_products.push(payload);
            }
        },
        USER_DELETE_WATCHLIST_PRODUCT_BY_ID(state, payload) {
            if (Array.isArray(payload)) {
                state.watchlist_products = state.watchlist_products.filter(e => {
                    return !payload.includes(e.product_id);
                });
            } else {
                const idx = state.watchlist_products.findIndex(e => e.product_id == payload);
                if (idx >= 0) {
                    state.watchlist_products.splice(idx, 1);
                }
            }
            
        },
        USER_UPSERT_WATCHLIST_ARTICLE(state, payload) {
            const idx = state.watchlist_articles.findIndex(e => e.article_id == payload.article_id);
            if (idx >= 0) {
                state.watchlist_articles[idx] = payload;
            } else {
                state.watchlist_articles.push(payload);
            }
        },
        USER_DELETE_WATCHLIST_ARTICLE_BY_ID(state, payload) {
            if (Array.isArray(payload)) {
                state.watchlist_articles = state.watchlist_articles.filter(e => {
                    return !payload.includes(e.article_id);
                });
            } else {
                const idx = state.watchlist_articles.findIndex(e => e.article_id == payload);
                if (idx >= 0) {
                    state.watchlist_articles.splice(idx, 1);
                }
            }
        },
        USER_CLEARN_STATE (state) {
            state.id = 0;
            state.token = '';
            state.telephone = '';
            state.email = '';
            state.avatar_url = null;
            state.point = 0;
            state.firstName = '';
            state.lastName = '';
        },
    },
    
};
