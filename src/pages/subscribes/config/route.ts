import type { RouteRecordRaw, RouteLocationRaw } from 'vue-router'

const SUBSCRIBES_ROUTE_NAME = 'subscribes'

export const SUBSCRIBES_LINK = {
  name: SUBSCRIBES_ROUTE_NAME
} as const satisfies RouteLocationRaw

export const SUBSCRIBES_ROUTE = {
  path: 'subscribes',
  name: SUBSCRIBES_LINK.name,
  component: () => import('../ui')
} as const satisfies RouteRecordRaw
