import axios from 'assets/js/utils/axios';

export default {
    state: {
        countries: [],
    },

    getters: {
        
    },

    actions: {
        GEO_FETCH_COUNTRIES ({commit}) {
            axios({
                uri: 'get/Country/status',
                success: (data) => {
                    commit('GEO_UPDATE_COUNTRY', data);
                },
            });
        },
    },

    mutations: {
        GEO_UPDATE_COUNTRY (state, countries) {
            state.countries = countries;
        },
    },
    
};
