export default {
    computed: {

        $mobile: {
            get() {
                return this.$store.getters['app/mobile'];
            },
            set(val) {
                this.$store.dispatch('app/mobile', val);
            },
        },

        $loading: {
            get() {
                return this.$store.getters['api/loading'];
            },
            set(val) {
                this.$store.dispatch('api/loading', val);
            },
        },

        $page: {
            get() {
                return {
                    props: this.$store.getters['page/props'],
                    component: this.$store.getters['page/component'] ,
                };
            },
            set(val) {
                const { props = null, component = null } = val || {};
                if (component) {
                    this.$store.dispatch('page/setPage', { props, component });
                }
            },
        },

        $navbar: {

            get() {
                return {
                    height: this.$store.getters['navbar/height'],
                    props: this.$store.getters['navbar/props'],
                    component: this.$store.getters['navbar/component'] ,
                };
            },

            set(val) {
                const { props = null, component = null, height = 0 } = val || {};
                if (component) {
                    this.$store.dispatch('navbar/setNavbar', { height, props, component });
                }
            },

        },

        $appBackground: {

            get() {
                return this.$store.getters['app/background'];
            },

            set(val) {

                if (val) {
                    this.$store.dispatch('app/background', val);
                }

            },

        },

    },
    methods: {
        async scrollTo(goTo, { scrollDesktop = 100, scrollMobile = -20 } = {}) {
            await this.$nextTick();
            this.$vuetify.goTo(goTo, {
                duration: 350,
                offset: this.$mobile ? scrollMobile : scrollDesktop,
                easing: 'easeInOutCubic',
            });
        },
    }
};
