import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Home from '../views/Home.vue'

const Category = () => import('../views/Category.vue')
const Builder = () => import('../views/Builder.vue')

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
    path: '/builder',
    name: 'Builder',
    component: Builder
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
