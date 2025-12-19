import type { User } from '@/entities/user'
import type { Profile } from '../model'

import { http } from '@/shared/api'

const PROFILE_PATH = '/profile'

interface ProfileDTO {
  id: string
  email: string
  name: string | null
  address: string | null
  role: User['role']
  created_at: string
}

export const getProfile = async (): Promise<Profile | null> => {
  const data = await http.fetchData<ProfileDTO>({ method: 'GET', url: PROFILE_PATH })

  return data === null ? null : profileMapDTO(data)
}

const profileMapDTO = ({ email, name, address }: ProfileDTO): Profile => ({ email, name, address })

export const updateProfile = (paylaod: { name: string; address: string }): Promise<boolean> =>
  http.isSuccess({ method: 'PUT', url: PROFILE_PATH, data: paylaod })
