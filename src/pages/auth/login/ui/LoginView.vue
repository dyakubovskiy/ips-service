<template>
  <div class="inner">
    <h1>Вход</h1>
    <div class="vstack">
      <div>
        <label class="label">Email</label>
        <input
          v-model="form.email"
          :disabled="isLoading"
          :class="{ error: hasError(form.email) }"
          class="input" />
      </div>
      <div>
        <label class="label">Пароль</label>
        <input
          v-model="form.password"
          type="password"
          :disabled="isLoading"
          :class="{ error: hasError(form.email) }"
          class="input" />
      </div>
      <div class="hstack">
        <RouterLink
          :to="REGISTER_LINK"
          :disabled="isLoading"
          :class="{ disabled: isLoading }"
          class="btn btn-ghost">
          Регистрация
        </RouterLink>
        <VButton
          :disabled="isLoading"
          @click="loginHandler">
          Войти
        </VButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/entities/user'
import { MAIN_LINK } from '@/shared/config'
import { http } from '@/shared/api'
import { VButton } from '@/shared/ui/button'
import { REGISTER_LINK } from '../../register'
import { login } from '../api'

interface LoginForm {
  email: string | null
  password: string | null
}

const form: Ref<LoginForm> = ref({
  email: null,
  password: null
})

const router = useRouter()
const { setUser } = useUserStore()

const isSubmitted: Ref<boolean> = ref(false)
const isLoading: Ref<boolean> = ref(false)

const loginHandler = async (): Promise<void> => {
  isSubmitted.value = true
  if (!isFromValid(form.value)) return
  isSubmitted.value = false

  isLoading.value = true
  const response = await login(form.value)
  isLoading.value = false

  if (response === null) {
    alert('Пользователь не найден!')
    return
  }

  const {
    user: { id, name, address, email, role },
    token
  } = response

  setUser({ id, name, address, email, role, token })
  http.setToken(token)

  router.push(MAIN_LINK)
}

const isFromValid = (form: LoginForm): form is { email: string; password: string } =>
  Object.values(form).every(Boolean)

const hasError = (field: string | null): boolean => isSubmitted.value && !field
</script>

<style scoped>
.hstack {
  justify-content: space-between;
}

.error {
  border: 1px solid red;
}

.btn:disabled {
  opacity: 0.3;
}

.input:disabled {
  background: gainsboro;
}

.btn-ghost.disabled {
  pointer-events: none;
}
</style>
