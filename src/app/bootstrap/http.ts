import type { Router } from 'vue-router'
import { useUserStore } from '@/entities/user'
import { http } from '@/shared/api'
import { LOGIN_LINK } from '@/shared/config'

export const setupHttp = (router: Router): void => {
  const { isUserAuth, getToken, resetUser } = useUserStore()

  if (isUserAuth) http.setToken(getToken())

  http.onUnauthorized(() => {
    resetUser()
    router.push(LOGIN_LINK.name)
  })
}
