import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import { Ripple } from 'vuetify/lib/directives';
import el from 'vuetify/es5/locale/el';
import en from 'vuetify/es5/locale/en';
import es from 'vuetify/es5/locale/es';
import it from 'vuetify/es5/locale/it';
import ru from 'vuetify/es5/locale/ru';

Vue.use(Vuetify, {
    directives: {
        Ripple,
    },
});

export default new Vuetify({
    theme: {
        dark: false,
        themes: {
            light: {
                primary: import.meta.env.VITE_PRIMARY_COLOR,
            },
            dark: {
                primary: import.meta.env.VITE_PRIMARY_COLOR,
            },
        },
        options: {
            variations: false,
        },
    },
    lang: {
        locales: { el, en, es, it, ku: en, ru },
        current: 'es',
    },
});
