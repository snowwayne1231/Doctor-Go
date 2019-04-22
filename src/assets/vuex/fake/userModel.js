import {replaceObject} from 'assets/js/utils/formatHandlers';
import axios from 'assets/js/utils/axios';

export default {
    state: {
        id: 0,
        group_id: 0,
        store_id: 0,
        token: '',
        avatar_url: 'static/images/face.jpg',
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
            axios({
                uri: 'logout',
                method: 'put',
            });
            commit('USER_CLEARN_STATE');
        },
    },

    mutations: {
        USER_UPDATE_STATE (state, payload) {
            replaceObject(state, payload);
        },
        USER_CLEARN_STATE (state) {
            state.id = 0;
            state.token = '';
            state.telephone = '';
            state.email = '';
            state.avatar_url = 'static/images/face.jpg';
            state.point = 0;
            state.firstName = '';
            state.lastName = '';
        },
    },
    
};
