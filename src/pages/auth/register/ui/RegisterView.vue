<template>
  <div class="inner">
    <h1>Регистрация</h1>
    <div class="vstack">
      <input
        v-model="form.email"
        placeholder="Email"
        class="input" />
      <input
        v-model="form.password"
        placeholder="Password"
        type="password"
        class="input" />
      <input
        v-model="form.name"
        placeholder="Name"
        class="input" />
      <input
        v-model="form.address"
        placeholder="Address"
        class="input" />
    </div>
    <div class="hstack">
      <RouterLink
        to="/login"
        class="btn btn-ghost">
        Авторизоваться
      </RouterLink>
      <button
        type="button"
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

const registerHandler = (): void => {
  if (isFormValid(form.value)) {
    registration(form.value)
  }
}

const isFormValid = (
  form: RegisterForm
): form is { email: string; password: string; name: string | null; address: string | null } => {
  return !!form.email && !!form.password
}
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
</style>
