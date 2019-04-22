import axios from 'assets/js/utils/axios';
import { getServerImage, generalSortArray, generalParseServerImageArray } from 'assets/js/utils/formatHandlers';
import { orderBy } from 'lodash';

const typeWordingMap = {
    1: '頭條',
    2: '推薦',
    3: '必讀',
    4: '最新',
};

export default {
    state: {
        banners: [],
        news: [],
        pointBanners: [],
        events: [],
    },

    getters: {
        
    },

    actions: {
        AD_FETCH_BANNERS({commit}) {
            return axios({
                uri: 'get/AdBanner/status',
                success: (data) => {
                    commit('AD_UPDATE_BANNERS', data);
                },
            });
        },
        AD_FETCH_NEWS({commit}) {
            return axios({
                uri: 'get/AdNews/enable',
                success: (data) => {
                    commit('AD_UPDATE_NEWS', data.map(e => {
                        e.type = typeWordingMap[e.type] || '未知';
                        return e;
                    }));
                },
            });
        },
        AD_FETCH_POINT_BANNERS({commit}) {
            return axios({
                uri: 'get/AdPointBanner/enable',
                success: (data) => {
                    commit('AD_UPDATE_POINT_BANNERS', data.map(e => {
                        e.type = typeWordingMap[e.type] || '未知';
                        return e;
                    }));
                },
            });
        },
        AD_FETCH_EVENTS({commit}) {
            return axios({
                uri: 'get/AdEvent/enable',
                success: (data) => {
                    commit('AD_UPDATE_EVENT', data);
                },
            });
        },
    },

    mutations: {
        AD_UPDATE_BANNERS(state, payload) {
            state.banners = orderBy(payload.map(e => {
                e.image = getServerImage(e.image);
                return e;
            }), ['sort', 'id'], ['desc', 'asc']);
        },
        AD_UPDATE_NEWS(state, payload) {
            state.news = generalSortArray(payload);
        },
        AD_UPDATE_POINT_BANNERS(state, payload) {
            state.pointBanners = generalParseServerImageArray(generalSortArray(payload));
        },
        AD_UPDATE_EVENT(state, payload) {
            state.events = generalParseServerImageArray(generalSortArray(payload)).map(e => {
                e.event_image = e.image;
                e.product_ids = e.product_ids.map(id => {
                    return parseInt(id, 10);
                });
                return e;
            });
        },
    },
    
};
