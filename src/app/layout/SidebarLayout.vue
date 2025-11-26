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
      <template v-if="isAdmin">
        <hr />
        <nav>
          <RouterLink
            v-for="{ to, name } in ADMIN_LINKS"
            :to
            :key="name">
            {{ name }}
          </RouterLink>
        </nav>
      </template>
    </aside>
    <div class="content">
      <header class="header">
        <div class="brand">ServiceHub</div>
        <div class="hstack">
          <div class="small">Привет, User</div>
          <RouterLink :to="MAIN_LINK">Профиль</RouterLink>
          <button
            type="button"
            class="btn btn-primary"
            @click="logutUser">
            Выход
          </button>
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

import { useRouter } from 'vue-router'
import { SUBSCRIBES_LINK } from '@/pages/subscribes'
import { INVOICES_LINK } from '@/pages/invoices'
import { useUserStore } from '@/entities/user'
import { MAIN_LINK } from '@/shared/config'

interface Link {
  to: RouteLocationRaw
  name: string
}

const LINKS = [
  { to: MAIN_LINK, name: 'Главная' },
  { to: SUBSCRIBES_LINK, name: 'Мои подписки' }
] as const satisfies Array<Link>

const ADMIN_LINKS = [{ to: INVOICES_LINK, name: 'Счета' }] as const satisfies Array<Link>

const { isAdmin, resetUser } = useUserStore()
const router = useRouter()

const logutUser = (): void => {
  resetUser()
  router.push({ name: MAIN_LINK.name })
}
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
