import axios from 'axios'
import store from '@/store'
import router from '@/router'

const { VUE_APP_FIREBASE_DB_URL: DB_URL } = process.env

const db = axios.create({
  baseURL: DB_URL
})

db.defaults.params = {}

db.interceptors.request.use(async config => {
  if (store.getters['auth/isAuthenticated']) {
    if (store.getters['auth/isExpired']) {
      await store.dispatch('auth/refresh')
    }

    config.params.auth = store.getters['auth/token']
  }

  return config
})

db.interceptors.response.use(null, error => {
  if (error.response.status === 401) {
    store.commit('auth/logout')
    store.commit('users/reset')

    router.push('/login?message=auth')
  }

  return Promise.reject(error)
})

export default db
