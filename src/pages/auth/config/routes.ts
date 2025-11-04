import type { RouteRecordRaw } from 'vue-router'

import { REGISTER_ROUTE, REGISTER_LINK } from '../register'
import { LOGIN_ROUTE, LOGIN_LINK } from '../login'

const AUTH_ROUTE_NAME = 'auth'

export const AUTH_SECTION_LINKS = {
  REGISTER: REGISTER_LINK,
  LOGIN: LOGIN_LINK
} as const

export const AUTH_SECTION_ROUTE = {
  path: '/auth',
  name: AUTH_ROUTE_NAME,
  children: [REGISTER_ROUTE, LOGIN_ROUTE],
  redirect: LOGIN_LINK
} as const satisfies RouteRecordRaw
