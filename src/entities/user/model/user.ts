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

type UserInfo = Pick<User, 'name' | 'address'>

interface UserStore {
  isUserAuth: Ref<boolean>
  isAdmin: Ref<boolean>
  userName: Ref<string>
  setUser: (userData: User) => void
  resetUser: () => void
  updateUserInfo: (info: UserInfo) => void
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

  const userName: UserStore['userName'] = computed(
    () => user.value?.name ?? user.value?.email ?? 'Пользователь'
  )

  const setUser: UserStore['setUser'] = (userData) => {
    user.value = userData
  }

  const resetUser: UserStore['resetUser'] = () => {
    user.value = null
  }

  const updateUserInfo: UserStore['updateUserInfo'] = (info) => {
    assertUserAuthorize(user)

    const { name, address } = info

    user.value.name = name
    user.value.address = address
  }

  const getUserEmail: UserStore['getUserEmail'] = () => {
    assertUserAuthorize(user)

    return user.value.email
  }
  const getToken: UserStore['getToken'] = () => {
    assertUserAuthorize(user)

    return user.value.token
  }

  const isAdmin: UserStore['isAdmin'] = computed(() => user.value?.role === USER_ROLES.ADMIN)

  function assertUserAuthorize(user: Ref<User | null>): asserts user is Ref<User> {
    if (user.value === null) throw new Error('Logic Exception. User not authorized')
  }

  return {
    isUserAuth,
    isAdmin,
    userName,
    setUser,
    resetUser,
    updateUserInfo,
    getUserEmail,
    getToken
  }
})
