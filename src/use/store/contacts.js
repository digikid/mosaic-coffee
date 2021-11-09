import { computed } from 'vue'
import { useStore } from 'vuex'
import { manageStoreHooks } from '@/utils/store/hooks'

export const useContacts = () => {
  const store = useStore()

  const categories = computed(() => store.getters[`contacts/categories`])

  return {
    ...manageStoreHooks('contacts'),
    categories
  }
}
