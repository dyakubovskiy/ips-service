<template>
  <button
    :disabled
    type="button"
    class="btn btn-primary"
    @click="$emit('click')">
    <slot />
  </button>
</template>

<script setup lang="ts">
interface ButtonProps {
  disabled?: boolean
}

defineProps<ButtonProps>()

defineEmits<{
  (e: 'click'): void
}>()
</script>
