<template>
    <section class="test-section">
        <row>
            <col>
                <wrapper>
                    Test Section (row->col-wrapper) 1
                </wrapper>
            </col>
            <col>
                <wrapper>
                    Test Section (row->col-wrapper) 2
                </wrapper>
            </col>
        </row>
        <row>
            <col>
                <wrapper>
                    Test Section (row->col-wrapper) 2
                </wrapper>
            </col>
        </row>
        <row>
            <col>
                <wrapper>
                    Test Section (row->col-wrapper) 2
                </wrapper>
            </col>
        </row>
    </section>
</template>

<script>
export default {
    name: 'test-section',
};
</script>
<style lang="scss">
body {

    .test-section {

    }

    &.mobile {

        .test-section {

        }
    }

}
</style>
