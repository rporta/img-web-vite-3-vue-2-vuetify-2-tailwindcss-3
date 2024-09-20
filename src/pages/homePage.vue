<template>
    <page class="home-page">
        <testSection/>
        <testSection/>
        <testSection/>
        <testSection/>
        <testSection/>
        <testSection/>
        <testSection/>
    </page>
</template>

<script>
import testSection from '@/sections/home/testSection.vue';
export default {
    name: 'home-page',

    metaInfo: {
        titleTemplate: '%s Home',
        meta: [

        ],
        link: [
            // { rel: 'canonical', href: '' },
        ],
    },
    components: {
        testSection,
    },
    async mounted() {
        await this.$mockup(null, { time: 150 })
        this.$appBackground = 'white';
    },

};
</script>
<style lang="scss">
body {

    .home-page {

    }

    &.mobile {

        .home-page {

        }
    }

}
</style>
