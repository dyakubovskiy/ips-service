<template>
  <div class="inner">
    <h1>Вход</h1>
    <div class="vstack">
      <div>
        <label class="label">Email</label>
        <input
          v-model="form.email"
          class="input" />
      </div>
      <div>
        <label class="label">Пароль</label>
        <input
          v-model="form.password"
          type="password"
          class="input" />
      </div>
      <div class="hstack">
        <RouterLink
          :to="REGISTER_LINK"
          class="btn btn-ghost">
          Регистрация
        </RouterLink>
        <button
          type="button"
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

const loginHandler = async (): Promise<void> => {
  if (!isFromValid(form.value)) return

  const user = await login(form.value)

  if (user === null) {
    alert('Пользователь не найден!')
    return
  }

  router.push(MAIN_LINK)
}

const isFromValid = (form: LoginForm): form is { email: string; password: string } =>
  Object.values(form).every(Boolean)
</script>

<style scoped>
.hstack {
  justify-content: space-between;
}
</style>
