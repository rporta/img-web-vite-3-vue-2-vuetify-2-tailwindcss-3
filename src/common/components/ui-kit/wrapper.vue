<template>
    <div
        class="tw-flex !tw-flex-none"
        :class="buildClass"
        :style="gap > 0 ? {
            gap: `${gap}px`,
        } : {}"
        @click="(e) => $emit('click', e)"
        >
        <slot/>
    </div>
</template>
<script>

export default {

    // eslint-disable-next-line vue/multi-word-component-names
    name: 'wrapper-ui',

    props: {

        name: {
            type: String,
            default: '',
        },

        direction: {
            type: String,
            default: 'row', // Valores: 'row', 'col', row-reverse, 'col-reverse'
        },
        justify: {
            type: String,
            default: '', // Valores: 'normal', 'start', 'end', 'center', 'between', 'around', 'evenly', 'stretch',
        },
        align: {
            type: String,
            default: '', // Valores: 'normal', 'start', 'end', 'center', 'between', 'around', 'evenly', 'baseline', 'stretch'
        },
        gap: {
            type: String,
            default: '', // Valores: '[10px]' // Corresponde al valor de 10 px
        },
        order: {
            type: String,
            default: '', // Valores: '[3]' // Corresponde al valor de 3
        },
        wrap: {
            type: String,
            default: 'wrap', // Valores: 'wrap', 'wrap-reverse', 'nowrap'
        },
    },

    computed: {

        buildClass() {

            return [

                (
                    (/^row$/.test(this.direction) && 'tw-flex-row')
                    || (/^col$/.test(this.direction) && 'tw-flex-col')
                    || (/^row-reverse$/.test(this.direction) && 'tw-flex-row-reverse')
                    || (/^col-reverse$/.test(this.direction) && 'tw-flex-col-reverse')
                    || 'flex-row'
                ), // Set direction

                ...(/.{1,}/.test(this.justify) ? [(
                    (/^normal$/.test(this.justify) && 'tw-justify-normal')
                    || (/^start$/.test(this.justify) && 'tw-justify-start')
                    || (/^end$/.test(this.justify) && 'tw-justify-end')
                    || (/^center$/.test(this.justify) && 'tw-justify-center')
                    || (/^between$/.test(this.justify) && 'tw-justify-between')
                    || (/^around$/.test(this.justify) && 'tw-justify-around')
                    || (/^evenly$/.test(this.justify) && 'tw-justify-evenly')
                    || (/^stretch$/.test(this.justify) && 'tw-justify-stretch')
                    || 'tw-justify-normal'
                )] : []), // Set justify

                ...(/.{1,}/.test(this.align) ? [(
                    (/^normal$/.test(this.align) && 'tw-content-normal')
                    || (/^start$/.test(this.align) && 'tw-content-start')
                    || (/^end$/.test(this.align) && 'tw-content-end')
                    || (/^center$/.test(this.align) && 'tw-content-center')
                    || (/^between$/.test(this.align) && 'tw-content-between')
                    || (/^around$/.test(this.align) && 'tw-content-around')
                    || (/^evenly$/.test(this.align) && 'tw-content-evenly')
                    || (/^baseline$/.test(this.align) && 'tw-content-baseline')
                    || (/^stretch$/.test(this.align) && 'tw-content-stretch')
                    || 'tw-content-normal'
                )] : []), // Set align

                // ...(/\[.{1,}\]/.test(this.gap) ? [`gap-${this.gap}`] : []), // Set gap

                ...(/\[.{1,}\]/.test(this.order) ? [`tw-order-${this.order}`] : []), // Set order

                ...(/.{1,}/.test(this.wrap) ? [(
                    (/^wrap$/.test(this.wrap) && 'tw-flex-wrap')
                    || (/^wrap-reverse$/.test(this.wrap) && 'tw-flex-wrap-reverse')
                    || (/^nowrap$/.test(this.wrap) && 'tw-flex-nowrap')
                    || 'tw-flex-wrap'
                )] : []), // Set wrap

            ];

        },
    },

};

</script>
