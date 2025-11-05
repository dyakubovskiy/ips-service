import { createRouter, createWebHistory } from 'vue-router'

import { CenteredLayout, SidebarLayout } from '../layout'
import { AUTH_SECTION_ROUTE } from '@/pages/auth'
import { useUserStore } from '@/entities/user'
import { MAIN_ROUTE } from '@/pages/main'
import { MAIN_LINK } from '@/shared/config'

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
        }
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

export default router
