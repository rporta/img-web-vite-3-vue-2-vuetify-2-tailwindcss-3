const defaultState = () => ({
    enabled: false,
    props: null,
    component: null,
    height: 0,
});
const mutations = {
    setNavbar(state, { props = null, component = null, enabled = true, height = 0 }) {
        if (component) {
            state.enabled = enabled;
            state.props = props;
            state.component = component;
            state.height = height;
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
    height: state => state.height,
};

export default {
    namespaced: true,
    state: defaultState(),
    mutations,
    actions,
    getters,
};
