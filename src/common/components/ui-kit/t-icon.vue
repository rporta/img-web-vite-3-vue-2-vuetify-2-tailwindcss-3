<template>
    <span
        class="v-icon"
        :class="[
            {
                'v-icon--left': left,
                'v-icon--right': right,
                'theme--light': light,
                'theme--dark': dark,
            },
            classColor,
        ]"
        :style="style"
        aria-hidden="true"
        >
        <span class="iconify" :data-icon="icon"></span>
    </span>
</template>

<script>
export default {
    // name: 'icon-ui',
    props: {
        color: String,
        left: Boolean,
        right: Boolean,
        light: Boolean,
        dark: Boolean,
    },
    computed: {
        icon() {
            return this.$slots.default[0].text.trim();
        },
        classColor() {
            return this.color?.indexOf('--text') !== -1 ? this.color : null;
        },
        style() {
            const style = {};
            if (this.color?.indexOf('--text') === -1) {
                if (this.color === 'primary') {
                    style.color = import.meta.env.VITE_PRIMARY_COLOR;
                } else {
                    style.color = this.color;
                }
            }
            return style;
        },
    },
};
</script>

<style lang="scss" scoped>
.v-icon {
    &.flip-x {
        transform: scaleX(-1);
    }
    &.flip-y {
        transform: scaleY(-1);
    }
    &.spin {
        animation: spin-animation 2s infinite linear;
    }
    @keyframes spin-animation {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(359deg);
        }
    }
}
</style>
