import type { Router } from 'vue-router'

import { useRouteGuards } from './routeGuards'
import { setupHttp } from './http'

export const bootstrapApp = (router: Router): void => {
  useRouteGuards(router)
  setupHttp(router)
}
