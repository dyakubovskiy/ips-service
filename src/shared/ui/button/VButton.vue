<template>
  <button
    type="button"
    class="btn btn-primary"
    :disabled
    @click="$emit('click')">
    <slot />
  </button>
</template>

<script setup lang="ts">
export interface ButtonProps {
  disabled?: boolean
}

defineProps<ButtonProps>()

defineEmits<{
  (e: 'click'): void
}>()
</script>
