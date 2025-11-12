<template>
  <div class="card">
    <div class="hstack">
      <div class="info">
        <h2>{{ name }}</h2>
        <div
          v-if="desc"
          class="small">
          {{ desc }}
        </div>
      </div>
      <div class="vstack">
        <div
          v-if="price"
          class="price">
          {{ currencyFormatter.format(price) }}
        </div>
        <div
          v-if="speed"
          class="speed">
          {{ speed }} Mb/s
        </div>
        <RouterLink to="/">Подробнее</RouterLink>
        <button
          type="button"
          class="btn btn-primary"
          @click="$emit('subscribe', id)">
          Подключить
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Tariff } from '../api'

defineProps<Tariff>()

defineEmits<{
  (e: 'subscribe', id: string): void
}>()

const currencyFormatter = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB'
})
</script>

<style scoped>
.hstack {
  justify-content: space-between;
}
</style>
