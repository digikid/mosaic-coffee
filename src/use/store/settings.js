import { useStore } from 'vuex'
import { manageStoreHooks } from '@/utils/store/hooks'

export const useSettings = () => {
  const store = useStore()

  const param = code => store.getters['settings/param'](code)

  return {
    ...manageStoreHooks('settings'),
    param
  }
}
