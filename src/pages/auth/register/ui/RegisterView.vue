<template>
  <div class="inner">
    <h1>Регистрация</h1>
    <div class="vstack">
      <input
        v-model="form.email"
        placeholder="Email"
        :disabled="isLoading"
        :class="{ error: hasError(form.email) }"
        class="input" />
      <input
        v-model="form.password"
        placeholder="Password"
        type="password"
        :disabled="isLoading"
        :class="{ error: hasError(form.password) }"
        class="input" />
      <input
        v-model="form.name"
        placeholder="Name"
        :disabled="isLoading"
        class="input" />
      <input
        v-model="form.address"
        placeholder="Address"
        :disabled="isLoading"
        class="input" />
    </div>
    <div class="hstack">
      <RouterLink
        :to="LOGIN_LINK"
        :disabled="isLoading"
        class="btn btn-ghost">
        Авторизоваться
      </RouterLink>
      <button
        type="button"
        :disabled="isLoading"
        class="btn btn-primary"
        @click="registerHandler">
        Зарегистрироваться
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'

import { ref } from 'vue'
import { LOGIN_LINK } from '../../login'
import { registration } from '../api'

interface RegisterForm {
  email: string | null
  password: string | null
  name: string | null
  address: string | null
}

const form: Ref<RegisterForm> = ref({
  email: null,
  password: null,
  name: null,
  address: null
})

const isSubmitted: Ref<boolean> = ref(false)
const isLoading: Ref<boolean> = ref(false)

const registerHandler = async (): Promise<void> => {
  isSubmitted.value = true
  if (!isFormValid(form.value)) return
  isSubmitted.value = false

  isLoading.value = true
  await registration(form.value)
  isLoading.value = false
}

const isFormValid = (
  form: RegisterForm
): form is { email: string; password: string; name: string | null; address: string | null } => {
  return !!form.email && !!form.password
}

const hasError = (field: string | null): boolean => isSubmitted.value && !field
</script>

<style scoped>
.inner {
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
}

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
</style>
