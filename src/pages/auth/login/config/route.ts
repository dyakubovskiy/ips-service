import type { RouteRecordRaw, RouteLocationRaw } from 'vue-router'

const LOGIN_ROUTE_NAME = 'login'

export const LOGIN_LINK = {
  name: LOGIN_ROUTE_NAME
} as const satisfies RouteLocationRaw

export const LOGIN_ROUTE = {
  path: 'login',
  name: LOGIN_LINK.name,
  component: () => import('../ui')
} as const satisfies RouteRecordRaw
