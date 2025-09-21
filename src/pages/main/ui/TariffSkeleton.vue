<template>
  <div class="card">
    <div class="hstack">
      <div class="info">
        <div class="name skeleton" />
        <div class="desc skeleton" />
        <div class="desc skeleton" />
      </div>
      <div class="vstack">
        <div class="price skeleton" />
        <div class="speed skeleton" />
        <div class="link skeleton" />
        <div class="button skeleton" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.info {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.name {
  height: 2.4rem;
  width: 60%;
}

.desc {
  height: 3.4rem;
  width: 100%;
}

.price,
.speed,
.link {
  width: 12rem;
  height: 2rem;
}

.button {
  width: 12rem;
  height: 3.6rem;
}
</style>
