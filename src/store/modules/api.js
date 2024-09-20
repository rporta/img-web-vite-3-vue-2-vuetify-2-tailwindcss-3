const defaultState = () => ({
    loading: false,
});

const mutations = {
    loading(state, bool) {
        state.loading = bool;
    },
};

const actions = {
    loading({ commit }, val) {
        commit('loading', val);
    },
};

const getters = {
    loading: state => state.loading,
};

export default {
    namespaced: true,
    state: defaultState(),
    mutations,
    actions,
    getters,
};
