<template>
  <div class="wrapper">
    <aside class="sidebar">
      <nav class="nav">
        <RouterLink
          v-for="{ to, name } in LINKS"
          :to
          :key="name">
          {{ name }}
        </RouterLink>
      </nav>
    </aside>
    <div class="content">
      <header class="header">
        <div class="brand">ServiceHub</div>
        <div class="hstack">
          <div class="small">Привет, User</div>
          <RouterLink :to="MAIN_LINK">Профиль</RouterLink>
        </div>
      </header>
      <main>
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

import { MAIN_LINK } from '@/shared/config'

interface Link {
  to: RouteLocationRaw
  name: string
}

const LINKS = [{ to: MAIN_LINK, name: 'Главная' }] as const satisfies Array<Link>
</script>

<style scoped>
.wrapper {
  display: flex;
  min-height: 100dvh;
}

.content {
  flex: 1;
}

.nav-link {
  display: block;
  color: inherit;
  padding: 0.8rem 0;
  font-size: 1.6rem;
  color: #cbd5e1;
}

.nav-link.router-link-active {
  color: #fff;
  font-weight: 700;
}
</style>
