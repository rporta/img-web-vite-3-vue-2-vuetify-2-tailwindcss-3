import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

import api from './modules/api';
import app from './modules/app';
import navbar from './modules/navbar';
import page from './modules/page';


Vue.use(Vuex);

// reducer: Filtra los modulos a persistir
// =======================================
// Persistencia de datos de la Store en LocalStorage (Permanecen aunque cierre el navegador)
const vuexPersistenceLocalStorage = new VuexPersistence({
    key: 'vuex2',
});

export default new Vuex.Store({
    modules: {
        api,
        app,
        navbar,
        page,
    },
    plugins: [
        vuexPersistenceLocalStorage.plugin,
    ],
});
