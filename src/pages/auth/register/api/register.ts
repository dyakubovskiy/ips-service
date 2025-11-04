import { http } from '@/shared/api'

interface UserData {
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

export const registration = async (payload: {
  email: string
  password: string
  name: string | null
  address: string | null
}): Promise<void> => {
  const data = await http.fetchData<UserData>({
    url: '/auth/register',
    method: 'POST',
    data: payload
  })

  console.log(data)
}
