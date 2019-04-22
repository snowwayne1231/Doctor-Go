import {replaceObject} from 'assets/js/utils/formatHandlers';
import axios from 'assets/js/utils/axios';

function parseListItem(ele) {
    return {
        product: 0,
        amount: 0,
        redeem: 0,
        selected: true,
        ...ele,
    };
}

export default {
    state: {
        list: [],
        
    },

    getters: {
        
    },

    actions: {
        CART_FETCH_ALL({commit}) {
            return axios({
                uri: 'payment/cart',
                success: (data) => {
                    data && commit('CART_UPDATE_LIST', data.json);
                },
            });
        },
        CART_ADD({commit, dispatch}, {product, amount}) {
            commit('CART_UPSERT_LIST', {
                product,
                amount,
            });

            return dispatch('CART_SAVE');
        },
        CART_SAVE({state}) {
            return axios({
                uri: 'payment/cart',
                method: 'put',
                data: {
                    json: JSON.stringify(state.list),
                },
                success: (data) => {
                    // console.log('CART_SAVE', data);
                },
            });
        },
        CART_CHECKOUT({state, commit}) {
            return axios({
                uri: 'payment/order',
                method: 'post',
                data: {
                    json: JSON.stringify(
                        state.list
                            .filter((e) => e.selected)
                            .map(e => {
                                return {
                                    product: e.product,
                                    amount: e.amount,
                                    redeem: e.redeem,
                                };
                            })
                    ),
                },
                success: (data) => {
                    commit('CART_UPDATE_LIST', []);
                    commit('USER_UPDATE_STATE', { point:data.customer.point });
                },
            });
        },
    },

    mutations: {
        CART_TOGGLE_SELECTED(state, payload) {
            const order = state.list.find((e, idx )=> idx == payload.idx);
            order.selected = !order.selected;
        },
        CART_SELECT_ALL(state, payload) {
            state.list.map(e => {
                e.selected = true;
            });
        },
        CART_UPDATE_AMOUNT(state, payload) {
            const order = state.list.find((e, idx )=> idx == payload.idx);
            order.amount = payload.amount;
        },
        CART_UPDATE_LIST(state, payload) {
            switch (typeof payload) {
            case 'object':
                state.list = payload.map(e => parseListItem(e));
                break;
            default:
                try {
                    state.list = JSON.parse(payload).map(e => parseListItem(e));
                } catch(e) {
                    state.list = [];
                    debug('CART_UPDATE_LIST format error', payload);
                }
            }
        },
        CART_UPSERT_LIST(state, payload) {
            const idx = state.list.findIndex(e => e.product == payload.product);
            if (idx >= 0) {
                state.list[idx].amount = payload.amount;
                state.list[idx].timestamp = new Date().getTime();
            } else {
                state.list.push(parseListItem({
                    product: payload.product,
                    amount: payload.amount,
                    timestamp: new Date().getTime(),
                }));
            }
        },
        CART_TOGGLE_REDEEM(state, payload) {
            debug('CART_TOGGLE_REDEEM', payload, state.list);
            const item = state.list.find((e, idx) => idx == payload.idx);
            item.redeem = item.redeem
                ? 0
                : payload.amount;
        },
        CART_REMOVE_LIST_ITEM(state, payload) {
            if (Array.isArray(payload)) {
                state.list = state.list.filter((e, idx) => !payload.includes(idx));
            } else {
                state.list = state.list.filter(e => e.selected);
            }
        },
    },
    
};
