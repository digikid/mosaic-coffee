import { computed } from 'vue'
import { useStore } from 'vuex'
import { manageStoreHooks } from '@/utils/store/hooks'

export const useSocials = () => {
  const store = useStore()

  const categories = computed(() => store.getters[`socials/categories`])

  return {
    ...manageStoreHooks('socials'),
    categories
  }
}
