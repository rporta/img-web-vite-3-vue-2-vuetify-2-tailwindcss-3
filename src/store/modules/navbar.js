const defaultState = () => ({
    enabled: false,
    props: null,
    component: null,
});

const mutations = {
    setNavbar(state, { props = null, component = null, enabled = true }) {
        if (component) {
            state.enabled = enabled;
            state.props = props;
            state.component = component;
        }
    },
    setEnabled(state, bool = true) {
        state.enabled = bool;
    },
    resetState(state) {
        Object.assign(state, defaultState());
    },
};

const actions = {
    setNavbar({ commit }, bool) {
        commit('setNavbar', bool);
    },
    setEnabled({ commit }, bool) {
        commit('setNavbar', bool);
    },
    resetState:({ commit }) => {
        commit('resetState');
    },
};

const getters = {
    enabled: state => state.enabled,
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
