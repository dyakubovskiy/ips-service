import { useRouter } from 'vue-router'
import { useUserStore } from '@/entities/user'
import { MAIN_LINK } from '@/shared/config'

interface UseLogout {
  logout: () => void
}

export const useLogout = (): UseLogout => {
  const router = useRouter()
  const { resetUser } = useUserStore()

  const logout: UseLogout['logout'] = () => {
    router.push({ name: MAIN_LINK.name })
    resetUser()
  }

  return { logout }
}
