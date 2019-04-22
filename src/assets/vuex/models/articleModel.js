// import {replaceObject} from 'assets/js/utils/formatHandlers';
import { getServerImage, generalSortArray, generalParseServerImageArray } from 'assets/js/utils/formatHandlers';
import axios from 'assets/js/utils/axios';
import { orderBy } from 'lodash';

export default {
    state: {
        language: 'zh_tw',
        lastUpdated: null,
        publications: [],
    },

    getters: {
        articleChapters(state) {
            let chapters = [];
            state.publications.map(e => {
                chapters = chapters.concat(e.chapters);
            });
            return chapters;
        },
    },

    actions: {
        ARTICLE_CHECK({dispatch, state}) {
            if (state.lastUpdated) {
                const now = new Date().getTime();
                if (state.lastUpdated + (15 * 60 * 1000) < now) {
                    return dispatch('ARTICLE_FETCH_MAGAZINES');
                }
            } else {
                return dispatch('ARTICLE_FETCH_MAGAZINES');
            }
        },
        ARTICLE_FETCH_MAGAZINES({commit}) {
            return axios({
                uri: 'get/ArticlePsaMagazine,chapters/enable',
                success: (data) => {
                    commit('ARTICLE_UPDATE_PUBLICATIONS', data);
                },
            });
        },
    },

    mutations: {
        ARTICLE_UPDATE_PUBLICATIONS(state, payload) {
            state.lastUpdated = new Date().getTime();
            state.publications = orderBy(payload.map(e => {
                
                e.image = getServerImage(e.image);
                e.chapters = generalSortArray(generalParseServerImageArray(e.chapters));
                
                return e;
            }), ['sort', 'id'], ['desc', 'asc']);
        },
    },
    
};
