import axios from 'assets/js/utils/axios';

export default {
    state: {
        fetching: [],
        isLoading: false,
        times: 0,
        averageMS: 1000,
    },

    getters: {
        
    },

    actions: {
        AXIOS_FETCHING_START ({commit}, {uri, promise}) {
            uri && commit('AXIOS_ADD_FETCHING_QUEUE', { uri, promise, timestamp: new Date().getTime() });
        },
        AXIOS_FETCHING_END ({commit}, {uri}) {
            uri && commit('AXIOS_REMOVE_FETCHING_QUEUE', { uri, timestamp: new Date().getTime() });
        },
        AXIOS_SEND_ERROR ({commit}, {msg, url, line}) {
            return axios({
                method: 'post',
                uri: 'server/storage/error',
                data: {
                    msg,
                    url,
                    line,
                }
            });
        },
    },

    mutations: {
        AXIOS_ADD_FETCHING_QUEUE (state, fetchingObject) {
            state.times++;
            if (state.fetching.length == 0 || !state.isLoading) {
                state.isLoading = true;
            }
            state.fetching.push(fetchingObject);
        },
        AXIOS_REMOVE_FETCHING_QUEUE (state, fetchingObject) {
            const idx = state.fetching.findIndex(e => e.uri === fetchingObject.uri);
            if (idx >= 0) {
                const object = state.fetching.splice(idx, 1)[0];
                const spendTime = new Date().getTime() - object.timestamp;
                const operation = Math.round((spendTime - state.averageMS) / state.times);
                state.averageMS += operation;
            }

            if (state.fetching.length == 0) {
                state.isLoading = false;
            }
        },
    },
    
};
