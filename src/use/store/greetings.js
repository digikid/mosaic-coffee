import { computed } from 'vue'
import { useStore } from 'vuex'
import { manageStoreHooks } from '@/utils/store/hooks'
import { randomNumber } from '@/utils/random'

export const useGreetings = () => {
  const store = useStore()

  const random = computed(() => {
    const items = store.getters['greetings/items'].filter(
      ({ active }) => active
    )

    if (!items.length) return ''

    const randomIndex = randomNumber(0, items.length - 1) || 0

    return items[randomIndex] ? items[randomIndex].text : ''
  })

  return {
    ...manageStoreHooks('greetings'),
    random
  }
}
