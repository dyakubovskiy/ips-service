<template>
  <div class="container">
    <h1>Профиль</h1>
    <div class="card">
      <div
        v-if="profile"
        class="vstack">
        <div>
          <label class="label">Email</label>
          <input
            v-model="profile.email"
            type="text"
            class="input p-muted"
            readonly />
        </div>
        <div>
          <label class="label">Имя</label>
          <input
            v-model="profile.name"
            type="text"
            class="input" />
        </div>
        <div>
          <label class="label">Адрес</label>
          <input
            v-model="profile.address"
            type="text"
            class="input" />
        </div>
        <div class="hstack">
          <VButton @click="saveHandler">Сохранить</VButton>
        </div>
      </div>
      <div
        v-else
        class="error">
        <VButton @click="fetchProfile">Получить профиль</VButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import type { Profile } from '../model'

import { ref, onMounted } from 'vue'
import { VButton } from '@/shared/ui/button'
import { getProfile, updateProfile } from '../api'

const profile: Ref<Profile | null> = ref(null)

const fetchProfile = async (): Promise<void> => {
  profile.value = await getProfile()
}

onMounted(fetchProfile)

const saveHandler = async (): Promise<void> => {
  if (profile.value === null) throw new Error('Logic Exception. Profile not initiated')

  const { name, address } = profile.value

  const payload = { name, address }

  if (isUpdatePayloadValid(payload) === false) {
    alert('Введены не корректные данные')
    return
  }

  const isUpdate = await updateProfile(payload)

  if (isUpdate === false) {
    alert('Не удалось обновить профиль')
    return
  }

  fetchProfile()
}

const isUpdatePayloadValid = (payload: {
  name: string | null
  address: string | null
}): payload is { name: string; address: string } =>
  Boolean(payload.name) && Boolean(payload.address)
</script>

<style scoped>
.hstack {
  justify-content: flex-end;
}

.input.p-muted {
  background: #d9d9d9;
}

.error {
  display: flex;
  justify-content: center;
}
</style>
