import type { RouteLocationRaw } from 'vue-router'

const MAIN_ROUTE_NAME = 'main'

export const MAIN_LINK = {
  name: MAIN_ROUTE_NAME
} as const satisfies RouteLocationRaw

const LOGIN_ROUTE_NAME = 'login'

export const LOGIN_LINK = {
  name: LOGIN_ROUTE_NAME
} as const satisfies RouteLocationRaw
