<template>
    <v-app>
        <v-main>

            <app :background="background">

                <appNavbar
                    :menu="menuList"
                    @navTo="goTo"
                    />

                <v-window
                    v-if="hasRouterName"
                    v-model="_activeWindow"
                    class="tw-absolute tw-w-full tw-top-[90px]"
                    :style="{
                        height: 'calc(100% - 90px)',
                    }"
                    >

                    <v-window-item
                        class="!tw-overflow-y-auto !tw-overflow-x-hidden tw-h-full"
                        v-for="(w, index) in windows"
                        :key="index"
                        :value="index"
                        >

                        <component :is="w.component" />

                    </v-window-item>

                </v-window>

            </app>

        </v-main>
    </v-app>
</template>

<script>
import appNavbar from '@/navbar/appNavbar.vue';
import { routes as allRoutes } from '@/routes.mjs';

import { useThrottleFn } from '@vueuse/core';
const body = document.querySelector('body');

export default {
    name: 'app',

    data() {
        return {
            activeWindow: 0,
            listRouteName: ['home', 'test'], // Se cargan en appNavbar, v-window, si el arreglo es vacio se toman todas las rutas definidas
        };
    },

    beforeCreate() {
        if (this.$store.getters['app/mobile']) {
            body.classList.add('mobile');
        } else {
            body.classList.remove('mobile', 'menu-mobile');
        }
    },

    mounted() {
        // Definimos si está en modo mobile
        const windowEventCheckMobile = useThrottleFn(() => { this.checkMobile(); }, 100);
        this.$nextTick(() => {
            window.addEventListener('resize', windowEventCheckMobile);
        });

    },

    methods: {
        checkMobile() {
            // const mobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) || window.innerWidth < 1024;
            const mobile = window.innerWidth < 1024;
            this.$mobile = mobile;
            if (mobile) {
                body.classList.add('mobile');
            } else {
                body.classList.remove('mobile');
            }
        },
        getRoutes(routesList, slash = '/') {
            return [
                ...new Set(routesList.reduce((array, route) => {

                    // ajustamos el path
                    const path = (slash.length === 1 ? `${slash}${route.path}`: `${slash}/${route.path}`)
                        .replace(/\/{2,}/, '/');

                    // No queremos las rutas que tengan (meta.exclude = true)
                    if (!route?.meta?.exclude) {
                        array.push(path);
                    }

                    // Aplicamos solucion recursiva para rutas hijas
                    if (route?.children?.length > 0) {
                        array.push(...this.getRoutes(route.children, path));
                    }

                    return array;
                }, []))
            ];
        },

        getWindows(routesList) {
            return [
                ...new Set(routesList.reduce((array, route) => {

                    const hasMetaExclude = !!route?.meta?.exclude;

                    // No queremos las rutas que tengan (meta.exclude = true)
                    if (!hasMetaExclude) {

                        array.push({
                            ...route
                        });

                    }

                    // Aplicamos solucion recursiva para rutas hijas
                    if (route?.children?.length > 0) {
                        array.push(...this.getWindows(route.children, route));
                    }

                    return array;
                }, []))
            ]
        },

        getMenuList(routesList, slash = '/') {
            return [
                ...new Set(routesList.reduce((array, route) => {

                    const hasMetaExclude = !!route?.meta?.exclude;

                    // ajustamos el path
                    const path = (slash.length === 1 ? `${slash}${route.path}`: `${slash}/${route.path}`)
                        .replace(/\/{2,}/, '/');

                    // No queremos las rutas que tengan (meta.exclude = true)
                    if (!hasMetaExclude) {


                        if (this.listRouteName.length > 0) {

                            const hasRouter = this.listRouteName.some(r => r === route.name);

                            if (hasRouter) {
                                array.push({
                                    [route.name]: path,
                                });
                            }

                        } else {

                            array.push({
                                [route.name]: path,
                            });

                        }

                    }

                    // Aplicamos solucion recursiva para rutas hijas
                    if (route?.children?.length > 0) {
                        array.push(...this.getRoutes(route.children, {
                            [route.name]: path,
                        }));
                    }

                    return array;
                }, []))
            ]
                .reduce(
                    (acum, current) => (acum[current[Object.keys(current)[0]]] = Object.keys(current)[0], acum),
                    {}
                )
        },
        async goTo(to) {


            if (this.$route.path !== to) {

                // Buscamos el name de la ruta
                const routeName = this.menuList[to];


                // Cargamos el windows en base al routeName
                this.activeWindow = this.windows.findIndex(w => w.name === routeName);

                await this.$mockup(null, { time: 150 });

                // Aplicamos el router push, para actualizar el link
                this.$router.replace({ path: to });
            }

        },
    },
    components: {
        appNavbar,
    },
    computed: {
        routes() {
            return this.getRoutes(allRoutes);
        },
        menuList() {
            return this.getMenuList(allRoutes);
        },
        windows() {
            return this.getWindows(allRoutes);
        },
        background() {
            return this.$store.getters['app/getBackground'];
        },
        hasRouterName() {
            return !!this.$route.name
        },
        _activeWindow: {
            get() {

                // Buscamos el name de la ruta
                const routeName = this.$route.name;

                // Cargamos el windows en base al routeName
                const id = this.windows.findIndex(w => w.name === routeName);

                return id !== -1 ? id : this.activeWindow;
            },
            set(val) {
                this.activeWindow = val;
            }
        }
    },

};
</script>

<style lang="scss">
.slide-enter-active, .slide-leave-active {
  transition: transform 0.5s ease;
}

.slide-enter, .slide-leave-to {
  transform: translateX(100%); /* Desplazar hacia la derecha */
}

.v-window__container {
    @apply tw-h-full;
}
</style>
