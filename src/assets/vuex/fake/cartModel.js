import {replaceObject} from 'assets/js/utils/formatHandlers';


export default {
    state: {
        orders: [
            { id: 1, selected: true, amount: 1, product: 1 },
            { id: 2, selected: true, amount: 2, product: 9 },
            { id: 3, selected: true, amount: 1, product: 3 },
            { id: 4, selected: true, amount: 2, product: 6 },
            { id: 5, selected: true, amount: 3, product: 4 },
        ],
        
    },

    getters: {
        
    },

    actions: {
        
    },

    mutations: {
        CART_TOGGLE_SELECTED(state, payload) {
            const order = state.orders.find(e => e.id == payload.id);
            order.selected = !order.selected;
        },
        CART_SELECT_ALL(state, payload) {
            state.orders.map(e => {
                e.selected = true;
            });
        },
        CART_UPDATE_AMOUNT(state, payload) {
            const order = state.orders.find(e => e.id == payload.id);
            order.amount = payload.amount;
        },
    },
    
};
