<template>
    <wrapper class="tw-w-full tw-h-full tw-absolute" :style="{ zIndex }">
        <slot/>
    </wrapper>
</template>
<script>
export default {
    name: 'absolute-component',
    props: {
        zIndex: {
            type: Number,
            default: 1,
        },
    },
};
</script>