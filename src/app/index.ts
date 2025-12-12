import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { http } from '@/shared/api'

import { router } from './router'
import App from './App.vue'
import './styles/main.css'

import { useUserStore } from '@/entities/user'

const unAuthorizedHandler = (): void => {
  const { resetUser } = useUserStore()

  resetUser()
}

http.onUnauthorized(unAuthorizedHandler)

const app = createApp(App)

app.use(createPinia())
app.use(router)

export { app }
