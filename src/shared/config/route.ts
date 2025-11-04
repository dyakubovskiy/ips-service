import type { RouteLocationRaw } from 'vue-router'

const MAIN_ROUTE_NAME = 'main'

export const MAIN_LINK = {
  name: MAIN_ROUTE_NAME
} as const satisfies RouteLocationRaw
