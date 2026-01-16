import { useRouter } from 'vue-router'
import { useUserStore } from '@/entities/user'
import { LOGIN_LINK } from '@/shared/config'

interface UseLogout {
  logout: () => void
}

export const useLogout = (): UseLogout => {
  const router = useRouter()
  const { resetUser } = useUserStore()

  const logout: UseLogout['logout'] = () => {
    resetUser()
    router.push({ name: LOGIN_LINK.name })
  }

  return { logout }
}
