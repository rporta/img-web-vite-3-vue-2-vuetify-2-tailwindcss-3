<template>
    <div
        class="tw-flex !tw-flex-none tw-w-full tw-h-full tw-flex-col tw-flex-wrap"
        :style="{ background }"
        >
        <slot/>
    </div>
</template>
<script>
export default {
    name: 'app-ui',
    props: ['background'],
    computed: {
        _background() {
            return `tw-bg-[${this.background}]`;
        }
    }
};
</script>