import { replaceObject } from 'assets/js/utils/formatHandlers';
import axios from 'assets/js/utils/axios';
import { getLanguageId } from 'assets/js/utils/i18n';
import { getServerImage, generalSortArray, arrayMapBy } from 'assets/js/utils/formatHandlers';
// import { orderBy } from 'lodash';


export default {
    state: {
        list: [],
        brands: [],
        categories: [],
    },

    getters: {
        getPorductCategoriesByParentId(state) {
            return (id) => {
                return id
                    ? state.categories.filter(e => e.parent_id == id)
                    : state.categories.filter(e => !e.parent_id);
            };
        },
    },

    actions: {
        PRODUCT_CHECK_LIST({dispatch, state}) {

            return state.list.length === 0
                ? dispatch('PRODUCT_FETCH_LIST')
                : true;
        },
        PRODUCT_FETCH_LIST({commit, dispatch, state}) {

            state.brands.length === 0 && dispatch('PRODUCT_FETCH_BRANDS');
            state.categories.length === 0 && dispatch('PRODUCT_FETCH_CATEGORIES');

            return axios({
                uri: 'get/Product,description/all',
                success: (data) => {
                    commit('PRODUCT_UPDATE_LIST', generalSortArray(data));
                },
            });
        },
        PRODUCT_FETCH_DATA_BY_ID({commit, dispatch, state}, id) {

            state.brands.length === 0 && dispatch('PRODUCT_FETCH_BRANDS');
            
            return axios({
                uri: `get/Product,description/${id}`,
                success: (data) => {
                    commit('PRODUCT_UPSERT_LIST_ITEM', data[0]);
                },
            });
        },
        PRODUCT_FETCH_BRANDS({commit}) {
            axios({
                uri: 'get/ProductBrand/enable',
                success: (data) => {
                    commit('PRODUCT_UPDATE_BRANDS', generalSortArray(data));
                },
            });
        },
        PRODUCT_FETCH_CATEGORIES({commit}) {
            axios({
                uri: 'get/ProductCategory/all',
                success: (data) => {
                    commit('PRODUCT_UPDATE_CATEGORIES', generalSortArray(data));
                },
            });
        },
    },

    mutations: {
        PRODUCT_UPDATE_LIST(state, payload) {
            const languageId = getLanguageId();
            state.list = payload.map(e => {
                return parseListItem(e, languageId);
            });
        },
        PRODUCT_UPSERT_LIST_ITEM(state, item) {
            const idx = state.list.findIndex(e => e.id == item.id);
            item = parseListItem(item, getLanguageId());
            if (idx >= 0) {
                state.list[idx] = item;
            } else {
                state.list.push(item);
            }
        },
        PRODUCT_UPDATE_BRANDS(state, payload) {
            state.brands = payload.map(e => {
                e.image = getServerImage(e.image);
                e.event_image = getServerImage(e.event_image);
                return e;
            });
        },
        PRODUCT_UPDATE_CATEGORIES(state, payload) {
            const categoryParentIdMap = arrayMapBy(payload, 'parent_id', true);
            state.categories = payload.map(e => {
                e.image = getServerImage(e.image);
                e.event_image = getServerImage(e.event_image);
                e.children = getChildrenIds(e.id);
                for (let i = 0; i < e.children.length; i++) {
                    let loc = e.children[i];
                    if (loc) {
                        e.children = e.children.concat(getChildrenIds(loc));
                    }
                }
                
                return e;
            });

            function getChildrenIds(id) {
                return categoryParentIdMap[id]
                    ? categoryParentIdMap[id].map(e => e.id)
                    : [];
            }
        },
    },
    
};


function parseListItem(item, languageId) {
    
    const description = item.description.find(des => des.language_id === languageId) || {};
    
    item.name = description.name || '';
    item.image = getServerImage(item.image);
    if (item.image_detail) {
        item.image_detail = item.image_detail.map(image => getServerImage(image));
    }
    // item.details = parseDescriptionToDetails(description.description);
    item.metaDescription = description.meta_description;
    item.metaDescriptionHTML = parseDescriptionToHtml(description.meta_description);
    item.descriptionHTML = description.description;
    return item;
}

function parseDescriptionToHtml(description) {
    return description
        ? `<div>${description.replace(/[\r\n]{1,2}/g, '<br />')}</div>`
        : '';
}
