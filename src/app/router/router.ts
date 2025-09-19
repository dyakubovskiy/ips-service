import { createRouter, createWebHistory } from 'vue-router'

import { CenteredLayout } from '../layout'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/auth',
      name: 'auth',
      children: [],
      component: CenteredLayout,
    },
  ],
})

export default router
