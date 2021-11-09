import { createApp } from 'vue'
import Toast from 'vue-toastification'
import router from '@/router'
import store from './store'

import App from './App.vue'

import '@/assets/styles/main.scss'

const app = createApp(App)
app.use(router)
app.use(store)

app.use(Toast, {
  position: 'bottom-right',
  maxToasts: 3,
  timeout: 1500,
  hideProgressBar: true,
  draggable: false
})

app.mount('#app')
