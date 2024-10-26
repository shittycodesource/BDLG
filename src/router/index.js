import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/upload',
        name: 'upload',
        component: () => import(/* webpackChunkName: "about" */ '../views/Upload.vue')
    },
    {
        path: '/my',
        name: 'My Files',
        component: () => import(/* webpackChunkName: "about" */ '../views/MyFiles.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
    },
    {
        path: '/settings',
        name: 'Settings',
        component: () => import(/* webpackChunkName: "about" */ '../views/Settings.vue')
    },
    {
        path: '/schedule',
        name: 'Schedule',
        component: () => import(/* webpackChunkName: "about" */ '../views/Schedule.vue')
    },
    {
        path: '/add-to-schedule',
        name: 'Add To Schedule',
        component: () => import(/* webpackChunkName: "about" */ '../views/AddToSchedule.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
