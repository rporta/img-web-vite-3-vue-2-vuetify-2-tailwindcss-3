<template>
    <v-dialog
        class="modal-component"
        v-model="wrapperOpen"
        :hide-overlay="hideOverlay"
        :persistent="persistent"
        content-class="!tw-rounded-[16px] tw-flex tw-flex-none !tw-w-[auto]"
        >
        <wrapper
            class="tw-bg-white tw-w-full"
            direction="col"
            >
            <slot name="body"/>
            <slot name="actions"/>
        </wrapper>
    </v-dialog>
</template>

<script>
export default {

    name: 'modal-ui',

    props: {

        /**
         *  Controla la apertura del modal, es una prop sync
         * @type {Object}
         */
        open: {
            type: Boolean,
            default: false,
        },

        /**
         *  Control si se muestra filtro oscuro detras del modal
         * @type {Object}
         */
        hideOverlay: {
            type: Boolean,
            default: false,
        },

        /**
         *  Controla que no se cierre al tocar tecla 'esc', o al hacer click por fuera del modal
         * @type {Object}
         */
        persistent: {
            type: Boolean,
            default: false,
        },

    },

    computed: {

        wrapperOpen: {
            get() {
                return this.open;
            },
            set(val) {
                this.$emit('update:open', val);
            },
        },

    },

};

</script>
<style lang="scss">
body {

    .modal-component {
        //
    }

    &.mobile {
        //
    }
}
</style>
