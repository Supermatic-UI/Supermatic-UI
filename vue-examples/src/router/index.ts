import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/form',
      name: 'Form Example',
      component: () => import('../views/FormExample.vue')
    },
    
    {
      path: '/actions',
      name: 'Actions Example',
      component: () => import('../views/ActionsExample.vue')
    }
  ]
})

export default router
