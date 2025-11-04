import type { RouteRecordRaw } from 'vue-router'

import { MAIN_LINK } from '@/shared/config'

export const MAIN_ROUTE = {
  path: '/',
  name: MAIN_LINK.name,
  component: () => import('../ui')
} as const satisfies RouteRecordRaw
