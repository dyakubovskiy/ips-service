<template>
  <div class="container">
    <h1>Список счетов</h1>
    <div class="p-muted">Созание и просмотрв счетов пользователей</div>
    <div
      v-if="isInvoicesLoading"
      class="card skeleton" />
    <div
      v-else
      class="card">
      <h2>Счета</h2>
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Пользователь</th>
            <th>Сумма</th>
            <th>Статус</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="isInvoiceListNotEmpty(invoices)">
            <tr
              v-for="{ id, email, amount, status } in invoices"
              :key="id">
              <td>{{ id }}</td>
              <td>{{ email }}</td>
              <td>{{ currencyFormatter.format(amount) }}</td>
              <td>{{ status }}</td>
            </tr>
          </template>
          <tr v-else>
            <td class="muted">Счетов нет</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="invoiceCreation">
      <select
        v-model="selectedUser"
        :class="{ skeleton: isUserLoading }"
        class="users"
        @mousedown="fetchUsers">
        <option
          v-for="{ id, email } in users"
          :key="id"
          :value="id">
          {{ email }}
        </option>
      </select>
      <VButton
        :disabled="!selectedUser"
        @click="submitInvoice(selectedUser)">
        Создать счет
      </VButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import type { Inovice, InvoiceUser } from '../model'

import { ref, onMounted } from 'vue'
import { currencyFormatter } from '@/shared/lib/formats'
import { VButton } from '@/shared/ui/button'
import { getInvoiceList, createInvoice, getUsersForInvoice } from '../api'

const invoices: Ref<Array<Inovice>> = ref([])
const isInvoicesLoading: Ref<boolean> = ref(false)

const fetchInvoices = async (): Promise<void> => {
  isInvoicesLoading.value = true
  await new Promise((resolve) => setTimeout(resolve, 300))
  invoices.value = await getInvoiceList()
  isInvoicesLoading.value = false
}

const isInvoiceListNotEmpty = (invoiceList: Array<Inovice>): boolean => invoiceList.length !== 0

onMounted(fetchInvoices)

const selectedUser: Ref<string | null> = ref(null)
const users: Ref<Array<InvoiceUser>> = ref([])
const isUserLoading: Ref<boolean> = ref(false)

const fetchUsers = async (): Promise<void> => {
  if (users.value.length) return

  isUserLoading.value = true
  users.value = await getUsersForInvoice()
  isUserLoading.value = false
}

const resetSelected = (): void => {
  selectedUser.value = null
}

const submitInvoice = async (userId: null | string): Promise<void> => {
  if (userId === null) {
    alert('Нужно выбрать пользователя')
    return
  }

  const isCreated = await createInvoice(userId)

  if (isCreated === false) {
    alert('Не удалось выставить счет')
    return
  }

  resetSelected()
  fetchInvoices()
}
</script>

<style scoped>
.invoiceCreation {
  margin-top: 2.4rem;
  display: flex;
  justify-content: flex-end;
  gap: 1.6rem;
}

.users {
  max-width: 15rem;
  width: 100%;
}

.card.skeleton {
  height: 25.8rem;
}
</style>
