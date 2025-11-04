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
        <button
          type="button"
          :disabled="isLoading"
          class="btn btn-primary"
          @click="loginHandler">
          Войти
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { MAIN_LINK } from '@/shared/config'
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

const isSubmitted: Ref<boolean> = ref(false)
const isLoading: Ref<boolean> = ref(false)

const loginHandler = async (): Promise<void> => {
  isSubmitted.value = true
  if (!isFromValid(form.value)) return
  isSubmitted.value = false

  isLoading.value = true
  const user = await login(form.value)
  await new Promise((resolve) => setTimeout(resolve, 5000 * 5000))
  isLoading.value = false

  if (user === null) {
    alert('Пользователь не найден!')
    return
  }

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
