import { createRouter, createWebHistory } from 'vue-router'

import { CenteredLayout } from '../layout'
import { AUTH_SECTION_ROUTE } from '@/pages/auth'
import { MAIN_ROUTE } from '@/pages/main'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      ...AUTH_SECTION_ROUTE,
      component: CenteredLayout
    },
    MAIN_ROUTE
  ]
})

export default router
