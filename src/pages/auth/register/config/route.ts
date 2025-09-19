import type { RouteRecordRaw, RouteLocationRaw } from 'vue-router'

const REGISTER_ROUTE_NAME = 'register'

export const REGISTER_LINK = {
  name: REGISTER_ROUTE_NAME,
} as const satisfies RouteLocationRaw

export const REGISTER_ROUTE = {
  path: 'register',
  name: REGISTER_LINK.name,
  component: () => import('../ui'),
} as const satisfies RouteRecordRaw
