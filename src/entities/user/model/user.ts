import type { Ref } from 'vue'

import { computed } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

interface User {
  id: string
  email: string
  name: string | null
  address: string | null
  role: string
  token: string
}

interface UserStore {
  isUserAuth: Ref<boolean>
  setUser: (userData: User) => void
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

  const getUserEmail: UserStore['getUserEmail'] = () => {
    if (user.value === null) throw new Error('Logic Exception. User not authorized')

    return user.value.email
  }

  const getToken: UserStore['getToken'] = () => {
    if (user.value === null) throw new Error('Logic Exception. User not authorized')

    return user.value.token
  }

  return { isUserAuth, setUser, getUserEmail, getToken }
})
