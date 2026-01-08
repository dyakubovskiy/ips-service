import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useLogout } from '@/features/logout'
import { http } from '@/shared/api'

import { router } from './router'
import App from './App.vue'
import './styles/main.css'

const unAuthorizedHandler = (): void => {
  const { logout } = useLogout()
  logout()
}

http.onUnauthorized(unAuthorizedHandler)

const app = createApp(App)

app.use(createPinia())
app.use(router)

export { app }
