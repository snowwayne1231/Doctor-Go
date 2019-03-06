import {replaceObject} from 'assets/js/utils/formatHandlers';

export default {
    state: {
        id: 0,
        group_id: 0,
        store_id: 0,
        account: '',
        token: '',
        avatar_url: 'static/images/face.jpg',
        firstName: '',
        lastName: '',
        telephone: '',
        fax: '',
        salt: '',
        point: 0,
        name: '',
        unreadMsg: 0,
    },

    getters: {
        isLogin: (state) => {
            // return true;
            return !!state.id;
        },
    },

    actions: {
        USER_LOGIN ({commit}, user) {
            localStorage.setItem('user', JSON.stringify(user));
            
            commit('USER_UPDATE_STATE', user);
        },
        USER_LOGOUT ({commit}) {
            localStorage.removeItem('user');
            commit('USER_CLEARN_STATE');
        },
    },

    mutations: {
        USER_UPDATE_STATE (state, payload) {
            replaceObject(state, payload);
        },
        USER_CLEARN_STATE (state) {
            state.id = 0;
            state.point = 0;
            state.name = '';
        },
    },
    
};
