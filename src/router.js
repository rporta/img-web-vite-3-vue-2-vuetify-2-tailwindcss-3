import Vue from 'vue';
import Router from 'vue-router';
import { routes } from '@/routes.mjs';
import store from '@/store/store';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) return null;
        return savedPosition || { x: 0, y: 0 };
    },
});

router.beforeEach(async (to, from, next) => {
    next();
});

export default router;
