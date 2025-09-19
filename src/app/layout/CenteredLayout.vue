<template>
  <div class="center">
    <div class="card">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.center {
  min-height: 100dvh;
  padding: 4rem;
  background: #f4f6f8;
}

.card {
  width: 48rem;
}
</style>
