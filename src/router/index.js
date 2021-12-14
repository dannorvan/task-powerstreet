import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/Login";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/main-page',
    name: 'MainPage',
    component: () => import(/* webpackChunkName: "main-page" */ '../views/MainPage')
  },
  {
    path: '/orders',
    name: 'Orders',

    component: () => import(/* webpackChunkName: "orders" */ '../views/Orders')
  },
  {
    path: '/saved-products',
    name: 'Saved',

    component: () => import(/* webpackChunkName: "saved-products" */ '../views/SavedProducts')
  },
  {
    path: '/edit-user',
    name: 'EditUser',

    component: () => import(/* webpackChunkName: "saved-products" */ '../views/EditUser')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
