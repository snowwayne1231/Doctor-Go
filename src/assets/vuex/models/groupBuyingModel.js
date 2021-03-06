// import {replaceObject} from 'assets/js/utils/formatHandlers';
import axios from 'assets/js/utils/axios';
import { orderBy } from 'lodash';

export default {
    state: {
        list: [],
        orders: [],
        now: new Date().getTime(),
    },

    getters: {
        groupBuyingList(state, getter, rootState) {
            const list = state.list.map(e => {
                const discount = e.discount_json.find(d => d.condition_quantity <= e.sum_quantity);
                const product = rootState.product.list.find(p => e.product_id == p.id) || {};
                const left_time = e.time_end ? new Date(e.time_end.replace(/-/g, '/')).getTime() - state.now : 0;
                const left_minutes = Math.floor(left_time / 1000 / 60);
                const left_days = Math.floor(left_minutes / 60 / 24);
                return {
                    ...e,
                    product,
                    now_price: discount ? discount.price : product.price || 0,
                    now_discount: discount,
                    left_days,
                    left_minutes,
                };
            });
            return list;
        },
    },

    actions: {
        GROUPBUYING_CHECK_LIST({state, dispatch}) {
            if (state.list.length == 0) {
                return dispatch('GROUPBUYING_FETCH');
            }
        },
        GROUPBUYING_FETCH({state, commit}) {
            const now = new Date().getTime();
            return axios({
                uri: 'get/ProductGroupBuying/status=1',
                success: (data) => {
                    
                    const list = data.filter(e => {
                        const time_st = e.time_start ? new Date(e.time_start.replace(/-/g, '/')).getTime() : 0;
                        const time_ed = e.time_end ? new Date(e.time_end.replace(/-/g, '/')).getTime() : 0;
                        
                        return now > time_st && (time_ed == 0 || now < time_ed);
                    }).map(e => {
                        e.discount_json = e.discount_json.map(ed => {
                            ed.condition_quantity = parseInt(ed.condition_quantity, 10);
                            ed.price = parseInt(ed.price, 10);
                            return ed;
                        }).sort((a,b) => b.condition_quantity - a.condition_quantity);
                        
                        return e;
                    });
                    commit('GROUPBUYING:UPDATE', {list, now});
                },
            });
        },
        GROUPBUYING_BUY({state, commit}, {id, quantity}) {
            
            return axios({
                uri: 'payment/groupbuying',
                method: 'post',
                data: {id, quantity},
                success: (data) => {
                    // debug(data);
                    const sum_order = data.sum_order;
                    const sum_quantity = data.sum_quantity;
                    const next = [...state.list];
                    const obj = next.find(e => e.id == id);
                    obj.sum_order = sum_order;
                    obj.sum_quantity = sum_quantity;
                    commit('GROUPBUYING:UPDATE', {list: next});
                },
            });
        },
        GROUPBUYING_FETCH_ORDER({state, commit, dispatch}) {
            const now = new Date().getTime();
            // return dispatch('GROUPBUYING_CHECK_LIST').then(() => {
            return axios({
                uri: 'authorization/get/PaymentGroupOrder/all',
                success: (data) => {
                    debug('PaymentGroupOrder', data);
                    const orders = data.map(e => {
                        e.total_net = e.total_net || 0;
                        return e;
                    });
                    commit('GROUPBUYING:UPDATE', {orders, now});
                },
            });
            // });
        },
    },

    mutations: {
        'GROUPBUYING:UPDATE': (state, payload) => {
            Object.keys(payload).map(key => {
                if (state[key]) {
                    state[key] = payload[key];
                }
            });
        },
    },
    
};
