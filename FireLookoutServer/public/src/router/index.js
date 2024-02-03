import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Overview',
      component: () => import('../views/OverView.vue')
    },
    {
      path: '/details',
      name: 'Detail',
      component: () => import('../views/Details.vue')
    }
  ]
})

export default router
