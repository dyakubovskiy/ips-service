import { useLogout } from '@/features/logout'
import { useUserStore } from '@/entities/user'
import { http } from '@/shared/api'

export const setupHttp = (): void => {
  const { isUserAuth, getToken } = useUserStore()
  const { logout } = useLogout()

  if (isUserAuth) http.setToken(getToken())

  http.onUnauthorized(logout)
}
