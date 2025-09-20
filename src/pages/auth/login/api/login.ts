import { http } from '@/shared/api'

interface LoginData {
  user: {
    id: string
    email: string
    password_hash: string
    name: string | null
    address: string | null
    role: string
    created_at: string
  }
  token: string
}

export const login = async (payload: {
  email: string
  password: string
}): Promise<LoginData | null> => {
  const { data, status } = await http.fetchFull<LoginData>({
    url: '/auth/login',
    method: 'POST',
    data: payload
  })

  return status === 200 && data !== null ? data : null
}
