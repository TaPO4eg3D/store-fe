import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Home from '../views/Home.vue'

const Category = () => import('../views/Category.vue')
const Builder = () => import('../views/Builder.vue')
const Orders =  () => import('../views/Orders.vue');

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/category/:id',
    name: 'Category',
    component: Category
  },
  {
    path: '/builder/:id',
    name: 'Builder',
    component: Builder
  },
  {
    path: '/orders/',
    name: 'Orders',
    component: Orders,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior () {
    window.scrollTo(0, 0)
  }
})

export default router
