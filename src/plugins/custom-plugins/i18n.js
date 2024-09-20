function changeLanguage (multi) {
    if (multi) {
        // this.$store.dispatch("configRadiux/actionsLocale", multi)
        this.$i18n.set(multi);
        this.$vuetify.lang.current = multi;
    }
}

export default {

    install(Vue) {
        // eslint-disable-next-line no-param-reassign
        Vue.prototype.$changeLanguage = changeLanguage;
    },
};
