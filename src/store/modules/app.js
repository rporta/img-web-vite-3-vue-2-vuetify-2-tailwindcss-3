const body = document.querySelector('body');


const defaultState = () => ({
    mobile: window.innerWidth < 1024,
    background: null,
});
const mutations = {
    mobile(state, val) {
        state.mobile = val;
    },
    background(state, val) {
        if (val) {
            state.background = val;
        }
    },
    resetState(state) {
        Object.assign(state, defaultState());
    },
};

const actions = {
    mobile({ commit }, bool) {
        commit('mobile', bool);
    },
    background({ commit }, bool) {
        commit('background', bool);
    },
    resetState:({ commit }) => {
        commit('resetState');
    },
};

const getters = {
    mobile: state => state.mobile,
    background: state => state.background,

    // (ref: store->module->page->props->background)
    // getBackground() {

    //     const [state, , , rootGetters] = arguments;

    //     state.background = rootGetters['page/props']?.background || state.background;

    //     return state.background;
    // },


};

export default {
    namespaced: true,
    state: defaultState(),
    mutations,
    actions,
    getters,
};
