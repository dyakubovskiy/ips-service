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
    <h2 class="invoice">Мои счета</h2>
    <div class="card">
      <table class="table">
        <thead>
          <tr>
            <th>Сумма</th>
            <th>Дата выставления</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="{ id, amount, createdAt } in invoices"
            :key="id">
            <td>{{ currencyFormatter.format(amount) }}</td>
            <td>{{ useDateFormat(createdAt, 'DD-MM-YYYY') }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import type { Profile, Invoice } from '../model'

import { ref, onMounted } from 'vue'
import { useUserStore } from '@/entities/user'
import { currencyFormatter, useDateFormat } from '@/shared/lib/formats'
import { VButton } from '@/shared/ui/button'
import { getProfile, updateProfile, getMyInvoices } from '../api'

const profile: Ref<Profile | null> = ref(null)
const { updateUserInfo } = useUserStore()

const fetchProfile = async (): Promise<void> => {
  profile.value = await getProfile()
}

async function saveHandler(): Promise<void> {
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

  updateUserInfo(payload)
  fetchProfile()
}

const isUpdatePayloadValid = (payload: {
  name: string | null
  address: string | null
}): payload is { name: string; address: string } =>
  Boolean(payload.name) && Boolean(payload.address)

const invoices: Ref<Array<Invoice>> = ref([])

const fetchInvoices = async (): Promise<void> => {
  invoices.value = await getMyInvoices()
}

const FETCH_HANDLES = [fetchProfile, fetchInvoices] as const

const fetchUserData = async (handles: ReadonlyArray<() => Promise<void>>): Promise<void> => {
  handles.forEach((hadnle) => hadnle())
}

onMounted(() => fetchUserData(FETCH_HANDLES))
</script>

<style scoped>
.invoice {
  padding-top: 2rem;
}

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
