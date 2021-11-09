import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const toast = useToast()

export const useAuth = () => {
  const store = useStore()
  const route = useRoute()
  const router = useRouter()

  const isAuthenticated = computed(() => store.getters['auth/isAuthenticated'])

  const login = async values => {
    try {
      await store.dispatch('auth/signIn', values)

      if (route.path === '/login') {
        router.push('/admin')
      }
    } catch (e) {
      toast(
        `При авторизации произошла ошибка, повторите позже. Код ошибки: ${e}`
      )
    }
  }

  const logout = () => {
    store.commit('auth/logout')
    store.commit('users/reset')

    router.push('/login')
  }

  return {
    isAuthenticated,
    login,
    logout
  }
}
