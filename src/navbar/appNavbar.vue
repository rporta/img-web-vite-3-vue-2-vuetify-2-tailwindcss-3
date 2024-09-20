<template>
    <navbar>
        <wrapper
            v-if="!$mobile"
            class="tw-h-[90px] tw-w-full tw-px-[10px] tw-rounded-b-[8px] tw-bg-[#1e1e1e]"
            justify="between"
            align="center"
            >
            <wrapper align="center" justify="center" gap="5">
                <img
                    src="/img/logo/logo.png"
                    class="self-ajust-img"
                    alt="editorWebMail"
                    >
                <span class="tw-m-auto tw-font-bold tw-text-[32px] tw-text-white">{{ title }}</span>
            </wrapper>

            <!-- Ver de implementar una lista nativa de tailwindcss con botones que se ajusten al diseño de Ivi -->

            <v-list
                class="!tw-flex !tw-p-0 !tw-bg-[#1e1e1e]"
                >

                <v-list-item
                    v-for="(label, key) in menu"
                    :key="key"
                    link
                    v-ripple="{ class: 'tw-text-[#7C849E]' }"
                    class="hover:!tw-bg-[#515c7f] !tw-rounded-[8px]"
                    @click="$emit('navTo', key)"
                    >

                    <v-list-item-content>
                        <v-list-item-title class="tw-text-[#DADCE4]">{{ label }}</v-list-item-title>
                    </v-list-item-content>

                </v-list-item>

            </v-list>
        </wrapper>
        <wrapper
            v-else
            class="!tw-bg-[#1e1e1e] !tw-h-[90px] !tw-w-full !tw-rounded-b-[8px]"
            align="center"
            >

            <v-app-bar
                flat
                dark
                class="!tw-bg-[#1e1e1e] !tw-w-full !tw-px-[10px]"
                >
                <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

                <v-toolbar-title>
                    <wrapper align="center" justify="center" gap="5">
                        <img
                            src="/img/logo/logo.png"
                            class="self-ajust-img"
                            alt="editorWebMail"
                            >
                        <span class="tw-m-auto tw-font-bold tw-text-[32px] tw-text-white">{{ title }}</span>
                    </wrapper>
                </v-toolbar-title>
            </v-app-bar>

            <v-navigation-drawer
                v-model="drawer"
                absolute
                temporary
                class="!tw-bg-[#1e1e1e]"
                width="290"
                >

                <v-list-item class="tw-my-[20px]">
                    <wrapper align="center" justify="center" gap="5">
                        <img
                            src="/img/logo/logo.png"
                            class="self-ajust-img"
                            alt="editorWebMail"
                            >
                        <span class="tw-m-auto tw-font-bold tw-text-[32px] tw-text-white">{{ title }}</span>
                    </wrapper>
                </v-list-item>

                <v-list
                    nav
                    >

                    <v-list-item
                        v-for="(label, key) in menu"
                        :key="key"
                        link
                        v-ripple="{ class: 'tw-text-[#7C849E]' }"
                        class="hover:!tw-bg-[#515c7f] !tw-rounded-[8px]"
                        @click="$emit('navTo', key)"
                        >

                        <v-list-item-content>
                            <v-list-item-title class="tw-text-[#DADCE4]">{{ label }}</v-list-item-title>
                        </v-list-item-content>

                    </v-list-item>

                </v-list>

            </v-navigation-drawer>

        </wrapper>
    </navbar>
</template>
<script>
export default {
    data() {
        return {
            drawer: false
        }
    },
    props: {
        title: {
            type: String,
        },
        menu: {
            type: Object,
            default: () => ({}),
        },
    },
};
</script>
<style lang="scss">
.self-ajust-img {
   object-fit: contain;
   max-width: 100%;
   max-height: 100%;
   width: auto;
   height: 50px;
}
</style>