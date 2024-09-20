export const routes = [
    {
        path: '',
        name: 'home',
        component: () => import('@/pages/homePage.vue'),
        children: [
            // object router
        ],
    },
    {
        path: '/test',
        name: 'test',
        component: () => import('@/pages/testPage.vue'),
        children: [
            // object router
        ],
    },
    {
        path: '/test2',
        name: 'test2',
        component: () => import('@/pages/test2Page.vue'),
        children: [
            // object router
        ],
    },
    {
        path: '/test3',
        name: 'test3',
        component: () => import('@/pages/test3Page.vue'),
        children: [
            // object router
        ],
    },
    {
        path: '*',
        name: '404',
        redirect: { name: 'home' },
        meta: {
            exclude: true,
        },
    },
];
