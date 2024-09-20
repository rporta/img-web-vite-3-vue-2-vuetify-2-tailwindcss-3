<template>
    <wrapper
        class="loading-component tw-h-full"
        justify="center"
        align="center"
        >
        <img
            class="tw-max-h-[300px] tw-max-w-[300px]"
            src="/img/logo/logo.png"
            alt="cargando"
            >
    </wrapper>
</template>
<style lang="scss">

body {

    .loading-component {
        background-color: var(--bg-color-loading);

        @-moz-keyframes spin {
            100% { -moz-transform: rotate(360deg); }
        }
        @-webkit-keyframes spin {
            100% { -webkit-transform: rotate(360deg); }
        }
        @keyframes spin {
            100% {
                -webkit-transform: rotate(360deg);
                transform:rotate(360deg);
            }
        }

        img {
            -webkit-animation:spin 4.5s linear infinite;
            -moz-animation:spin 4.5s linear infinite;
            animation:spin 4.5s linear infinite;
        }


    }

    &.body {

        .loading-component {
            //
        }
    }
}

</style>
