import type { NavigationGuardNext } from 'vue-router'

import { createRouter, createWebHistory } from 'vue-router'
import { AUTH_SECTION_ROUTE } from '@/pages/auth'
import { MAIN_ROUTE } from '@/pages/main'
import { SUBSCRIBES_ROUTE } from '@/pages/subscribes'
import { INVOICES_ROUTE } from '@/pages/invoices'
import { useUserStore } from '@/entities/user'
import { MAIN_LINK } from '@/shared/config'
import { CenteredLayout, SidebarLayout } from '../layout'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      ...AUTH_SECTION_ROUTE,
      component: CenteredLayout
    },
    {
      path: MAIN_ROUTE.path,
      redirect: MAIN_LINK,
      children: [
        {
          path: '',
          name: MAIN_ROUTE.name,
          component: MAIN_ROUTE.component
        },
        SUBSCRIBES_ROUTE,
        { ...INVOICES_ROUTE, beforeEnter: (to, from, next) => adminRouteGuard(next) }
      ],
      component: SidebarLayout
    }
  ]
})

router.beforeEach((to, from, next) => {
  const { isUserAuth } = useUserStore()

  if (isUserAuth) {
    if (to.path.startsWith(AUTH_SECTION_ROUTE.path)) {
      return next({ name: MAIN_LINK.name })
    }

    return next()
  }

  if (to.path.startsWith(AUTH_SECTION_ROUTE.path)) {
    return next()
  }

  return next({ name: 'login' })
})

const adminRouteGuard = (next: NavigationGuardNext) => {
  const { isAdmin } = useUserStore()

  if (isAdmin) next()
  else next({ name: MAIN_LINK.name })
}

export default router
