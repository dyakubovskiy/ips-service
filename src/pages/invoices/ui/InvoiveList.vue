<template>
  <div class="container">
    <h1>Список счетов</h1>
    <div class="p-muted">Созание и просмотрв счетов пользователей</div>
    <div class="card">
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
      <VButton @click="createInvoice">Создать счет</VButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import type { Inovice } from '../model'

import { ref, onMounted } from 'vue'
import { currencyFormatter } from '@/shared/lib/formats'
import { VButton } from '@/shared/ui/button'
import { getInvoiceList, createInvoice } from '../api'

const invoices: Ref<Array<Inovice>> = ref([])

const isInvoiceListNotEmpty = (invoiceList: Array<Inovice>): boolean => invoiceList.length !== 0

onMounted(async () => (invoices.value = await getInvoiceList()))
</script>

<style scoped>
.invoiceCreation {
  margin-top: 2.4rem;
}
</style>
