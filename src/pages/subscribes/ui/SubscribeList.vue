<template>
  <div class="container">
    <h1>Мои подписки</h1>
    <div class="p-muted">Список подписок текущего пользователя</div>
    <div class="card">
      <table class="table">
        <thead>
          <tr>
            <th>Тариф</th>
            <th>Дата подписки</th>
            <th>Цена</th>
            <th>Скорость</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="{ id, name, subscribeAt, price, speed } in subscribes"
            :key="id">
            <td>{{ name }}</td>
            <td>{{ useDateFormat(subscribeAt, 'DD-MM-YYYY') }}</td>
            <td>{{ currencyFormatter.format(price) }}</td>
            <td>{{ speed }} Mb/s</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import type { Subscribe } from '../model'

import { ref, onMounted } from 'vue'
import { useDateFormat } from '@/shared/lib/formats'
import { getSubscribeList } from '../api'

const subscribes: Ref<Array<Subscribe>> = ref([])

const currencyFormatter = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB'
})

onMounted(async () => {
  subscribes.value = await getSubscribeList()
})
</script>
