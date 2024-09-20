<template>
    <page class="test-page">
        <testSection/>
    </page>
</template>

<script>
import testSection from '@/sections/home/testSection.vue';
export default {
    name: 'test3-page',

    metaInfo: {
        titleTemplate: '%s Test3',
        meta: [

        ],
        link: [
            // { rel: 'canonical', href: '' },
        ],
    },
    components: {
        testSection,
    },

};
</script>
<style lang="scss">
body {

    .test-page {

    }

    &.mobile {

        .test-page {

        }
    }

}
</style>
