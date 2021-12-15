import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Login',
        meta: {requiresAuth: false},
        component: () => import(/* webpackChunkName: "main-page" */ '../views/Login')
    },
    {
        path: '/main-page',
        name: 'MainPage',
        meta: {requiresAuth: true},
        component: () => import(/* webpackChunkName: "main-page" */ '../views/MainPage')
    },
    {
        path: '/orders',
        name: 'Orders',
        meta: {requiresAuth: true},
        component: () => import(/* webpackChunkName: "orders" */ '../views/Orders')
    },
    {
        path: '/saved-products',
        name: 'Saved',
        meta: {requiresAuth: true},
        component: () => import(/* webpackChunkName: "saved-products" */ '../views/SavedProducts')
    },
    {
        path: '/edit-users',
        name: 'EditUsers',
        meta: {requiresAuth: true},
        component: () => import(/* webpackChunkName: "edit-users" */ '../views/EditUsers')
    },
    {
        path: '/edit-profile',
        name: 'EditProfile',
        meta: {requiresAuth: true},
        component: () => import(/* webpackChunkName: "edit-profile" */ '../views/EditProfile')
    },
    {
        path: '*',
        redirect: '/',
        meta: {requiresAuth: false},
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, _from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        const auth = JSON.parse(localStorage.getItem('user'));
        if (!auth) {
            next({name: 'Login'});
        } else {
            next()
        }
    } else {
        next()
    }
});

export default router
