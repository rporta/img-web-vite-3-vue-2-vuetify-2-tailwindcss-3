<template>
    <v-app>
        <v-main>

            <app :background="background">

                <v-window
                    v-model="mainWindows"
                    class="tw-absolute tw-w-full tw-h-full"
                    touchless
                    >

                    <!-- loading -->
                    <v-window-item
                        :value="0"
                        class="tw-h-full"
                        >

                        <loading/>

                    </v-window-item>

                    <!-- app -->
                    <v-window-item
                        :value="1"
                        class="tw-h-full"
                        >

                        <!-- dinamic navbar del store -->
                        <component
                            :is="navbar"
                            @navTo="goTo"
                            v-bind="$navbar.props"
                            />

                        <!-- currentRouter (fullpath) -->
                        <v-window
                            v-if="hasRouterName"
                            v-model="_activeWindow"
                            class="tw-absolute tw-w-full tw-top-[90px]"
                            :style="{
                                height: `calc(100% - ${$navbar.height})`,
                            }"
                            touchless
                            >

                            <v-window-item
                                class="!tw-overflow-y-auto !tw-overflow-x-hidden tw-h-full"
                                v-for="(w, index) in windows"
                                :key="index + _activeWindow"
                                :value="index"
                                >

                                <component
                                    :is="w.component"
                                    v-bind="$route.params"
                                    />

                            </v-window-item>

                        </v-window>

                    </v-window-item>
                </v-window>

            </app>

        </v-main>

    </v-app>

</template>

<script>
import loading from '@/common/components/loading.vue';
import { routes as allRoutes } from '@/routes.mjs';

import { useThrottleFn } from '@vueuse/core';
const body = document.querySelector('body');

export default {
    name: 'app',

    data() {
        return {
            mainWindows: 0, // alterna entre <loading> -> <app>
            activeWindow: 0, // list All routes en index 0
            listRouteName: ['home', 'test'], // Se cargan en this.$navbar, v-window, si el arreglo es vacio se toman todas las rutas definidas
            loading: false, // mientras sea false mustra loading luego app
        };
    },

    beforeCreate() {

        if (this.$store.getters['app/mobile']) {

            body.classList.add('mobile');

        } else {

            body.classList.remove('mobile', 'menu-mobile');

        }

    },

    async mounted() {

        // Definimos si está en modo mobile

        const windowEventCheckMobile = useThrottleFn(() => { this.checkMobile(); }, 100);
        this.$nextTick(() => {
            window.addEventListener('resize', windowEventCheckMobile);
        });

        // Aplicamos configuracion a nivel app (appBackground, navbar)

        this.$appBackground = '#000';

        this.$navbar = {
            props: {
                menu: this.menuList,
                title: this.title,
            },
            component: 'appNavbar',
            height: '90px',
        };

        // Consultamos si esta cargando

        if (!this.loading) {

            this.loading = await this.$mockup(true, { time: 2500 });

            // Cargamos <app>

            this.mainWindows = 1;
        }

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

        }
    },
    components: {

        loading,

    },
    computed: {

        navbar() {

            const navbarName = this.$store.getters['navbar/component'];

            if (navbarName === null) {
                return navbarName;
            }

            return () => import(`./navbar/${navbarName}.vue`);
        },

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
            return this.$appBackground;
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

                return id !== -1 ? id : this.activeWindow; // o la windows final que es la 404
            },
            set(val) {
                this.activeWindow = val;
            }
        },

        title() {
            return import.meta.env.VITE_APP_NAME;
        },

        navbarName() {
            return this.$store.getters['navbar/component'];
        },

    },
};
</script>