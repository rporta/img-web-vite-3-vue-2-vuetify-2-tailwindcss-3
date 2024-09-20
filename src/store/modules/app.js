const body = document.querySelector('body');


const defaultState = () => ({
    mobile: window.innerWidth < 1024,
    background: null,
});
const mutations = {
    mobile(state, val) {
        state.mobile = val;
    },
    resetState(state) {
        Object.assign(state, defaultState());
    },
};

const actions = {
    mobile({ commit }, bool) {
        commit('mobile', bool);
    },
    resetState:({ commit }) => {
        commit('resetState');
    },
};

const getters = {
    mobile: state => state.mobile,

    // (ref: store->module->page->props->background)
    getBackground() {

        const [state, , , rootGetters] = arguments;

        state.background = rootGetters['page/props']?.background || null;

        return state.background;
    },


};

export default {
    namespaced: true,
    state: defaultState(),
    mutations,
    actions,
    getters,
};
