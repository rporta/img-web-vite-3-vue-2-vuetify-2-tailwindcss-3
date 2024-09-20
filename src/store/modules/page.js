const defaultState = () => ({
    props: {
        background: 'red',
    },
    component: null,
});

const mutations = {
    setPage(state, { props = null, component = null }) {
        state.props = props;
        state.component = component;
    },
    resetState(state) {
        Object.assign(state, defaultState());
    },
};

const actions = {
    setPage({ commit }, bool) {
        commit('setPage', bool);
    },
    resetState:({ commit }) => {
        commit('resetState');
    },
};

const getters = {
    props: state => state.props,
    component: state => state.component,
};

export default {
    namespaced: true,
    state: defaultState(),
    mutations,
    actions,
    getters,
};
