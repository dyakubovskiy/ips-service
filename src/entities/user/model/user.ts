import type { Ref } from 'vue'

import { computed } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  MANAGE: 'manager'
} as const

type Role = (typeof USER_ROLES)[keyof typeof USER_ROLES]

export interface User {
  id: string
  email: string
  name: string | null
  address: string | null
  role: Role
  token: string
}

interface UserStore {
  isUserAuth: Ref<boolean>
  isAdmin: Ref<boolean>
  setUser: (userData: User) => void
  resetUser: () => void
  getUserEmail: () => string
  getToken: () => string
}

export const useUserStore = defineStore('useUserStore', (): UserStore => {
  const user = useStorage<User | null>('ips-user', null, localStorage, {
    serializer: {
      read(raw) {
        return raw ? JSON.parse(raw) : null
      },
      write(value) {
        return value ? JSON.stringify(value) : ''
      }
    }
  })

  const isUserAuth: UserStore['isUserAuth'] = computed(() => !!user.value)

  const setUser: UserStore['setUser'] = (userData) => {
    user.value = userData
  }

  const resetUser: UserStore['resetUser'] = () => {
    user.value = null
  }

  const getUserEmail: UserStore['getUserEmail'] = () => {
    if (user.value === null) throw new Error('Logic Exception. User not authorized')

    return user.value.email
  }

  const getToken: UserStore['getToken'] = () => {
    if (user.value === null) throw new Error('Logic Exception. User not authorized')

    return user.value.token
  }

  const isAdmin: UserStore['isAdmin'] = computed(() => user.value?.role === USER_ROLES.ADMIN)

  return { isUserAuth, setUser, resetUser, getUserEmail, getToken, isAdmin }
})
