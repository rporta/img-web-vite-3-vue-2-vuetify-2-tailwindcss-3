import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store/store';
import vuetify from '@/plugins/vuetify';

import '@/plugins/custom-plugins';
import '@/plugins/vue-meta';
import '@/plugins/vue-cookies-ts';
import '@/plugins/v-mask';
import '@/plugins/vue-lazyload';
import '@/plugins/vee-validate';
import '@/plugins/portal-vue';
import '@purge-icons/generated';
import '@/tailwind.css';

import AOS from '@/plugins/aos';

Vue.config.productionTip = false;

// Import  Vuex and vuex-i18n and configApp
import vuexI18n from 'vuex-i18n';
import configApp from '@/config/configApp.json';

// Integrate vuexI18n, store
Vue.use(vuexI18n.plugin, store);

// Import languages
import es from '@/lang/multi/es.js';


// add languages
Vue.i18n.add('es', es);

// set languages default
Vue.i18n.set(configApp.language.default);

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App),
    created() {
        // Fuerza la actualización del caché del navegador al hacer un nuevo deploy
        const buildTimeStampLSKey = 'appBuildTimeStamp';
        const timeStamp = localStorage.getItem(buildTimeStampLSKey);
        if (!timeStamp || timeStamp !== import.meta.env.VITE_BUILD_TIMESTAMP) {
            localStorage.setItem(buildTimeStampLSKey, import.meta.env.VITE_BUILD_TIMESTAMP);
            window.location.reload();
        }
    },
    mounted() {
        AOS.init();
    },
}).$mount('#app');
