import type { RouteRecordRaw, RouteLocationRaw } from 'vue-router'

const PROFILE_ROUTE_NAME = 'profile'

export const PROFILE_LINK = {
  name: PROFILE_ROUTE_NAME
} as const satisfies RouteLocationRaw

export const PROFILE_ROUTE = {
  path: 'profile',
  name: PROFILE_LINK.name,
  component: () => import('../ui')
} as const satisfies RouteRecordRaw
