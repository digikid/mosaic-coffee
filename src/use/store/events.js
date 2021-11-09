import { computed } from 'vue'
import { useStore } from 'vuex'

import { manageStoreHooks } from '@/utils/store/hooks'

import { sortByDate } from '@/utils/sort'

export const useEvents = () => {
  const store = useStore()

  const param = code => store.getters[`settings/param`](code)

  const isActual = date => new Date(JSON.parse(date)) > new Date()

  const published = computed(() => {
    const items = [...store.getters[`events/items`]] || []

    let result = items.filter(item => item.active)

    if (param('EVENTS_SORT_BY_DATE')) {
      result = sortByDate(result, true)
    }

    if (!param('EVENTS_SHOW_PAST')) {
      result = result.filter(({ date }) => isActual(date))
    }

    if (param('EVENTS_MAX_COUNT')) {
      result = result.slice(0, param('EVENTS_MAX_COUNT'))
    }

    return result
  })

  return {
    ...manageStoreHooks('events'),
    isActual,
    published
  }
}
