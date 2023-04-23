import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
declare module 'vue-router' {
    interface RouteMeta {
        title?: string
        active?: boolean
        icon?: string
        fixed?: boolean
        noCache?: boolean
        parent?: string
    }
}

export const firstFixedRoute = {
    name: 'Home',
    meta: {
        title: '网址',
        icon: 'global-outlined',
        fixed: true,
    },
}

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('../views/Home.vue'),
        ...firstFixedRoute,
    },
    {
        path: '/demo/list',
        name: 'DemoList',
        component: () => import('../views/demo/List.vue'),
    },
    {
        path: '/demo/form',
        name: 'DemoForm',
        component: () => import('../views/demo/FormDemo.vue'),
    },
    {
        path: '/children/:id?',
        name: 'children',
        component: () => import('../views/children.vue'),
        meta: {
            title: 'children',
            parent: 'DemoForm',
            icon: 'chrome-outlined',
        },
    },
    {
        path: '/iframe',
        name: 'Iframe',
        component: () => import('../views/Iframe.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
