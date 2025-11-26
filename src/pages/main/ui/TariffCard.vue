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
        <VButton @click="$emit('subscribe', id)">Подключить</VButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Tariff } from '../api'

import { currencyFormatter } from '@/shared/lib/formats'
import { VButton } from '@/shared/ui/button'

defineProps<Tariff>()

defineEmits<{
  (e: 'subscribe', id: string): void
}>()
</script>

<style scoped>
.hstack {
  justify-content: space-between;
}
</style>
