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
    },
};
