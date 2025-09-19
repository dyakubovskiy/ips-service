import type { RouteRecordRaw } from 'vue-router'

import { REGISTER_ROUTE, REGISTER_LINK } from '../register'

const AUTH_ROUTE_NAME = 'auth'

export const AUTH_SECTION_LINKS = {
  REGISTER: REGISTER_LINK,
} as const

export const AUTH_SECTION_ROUTE = {
  path: '/auth',
  name: AUTH_ROUTE_NAME,
  children: [REGISTER_ROUTE],
  redirect: REGISTER_LINK,
} as const satisfies RouteRecordRaw
