import type { RouteRecordRaw, RouteLocationRaw } from 'vue-router'

const INVOICES_ROUTE_NAME = 'invoices'

export const INVOICES_LINK = {
  name: INVOICES_ROUTE_NAME
} as const satisfies RouteLocationRaw

export const INVOICES_ROUTE = {
  path: 'invoices',
  name: INVOICES_LINK.name,
  component: () => import('../ui')
} as const satisfies RouteRecordRaw
