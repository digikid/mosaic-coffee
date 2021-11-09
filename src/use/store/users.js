import { computed } from 'vue'
import { useStore } from 'vuex'
import { manageStoreHooks } from '@/utils/store/hooks'

export const useUsers = () => {
  const store = useStore()

  const current = computed(() => store.getters[`users/current`])

  return {
    ...manageStoreHooks('users'),
    current
  }
}
