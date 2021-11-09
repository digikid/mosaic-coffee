import { manageStoreGetters } from '@/store/utils/getters'
import { manageStoreMutations } from '@/store/utils/mutations'
import { manageStoreActions } from '@/store/utils/actions'

export default {
  namespaced: true,
  state() {
    return {
      items: [],
      empty: {
        code: '',
        type: '',
        title: '',
        value: ''
      }
    }
  },
  getters: {
    ...manageStoreGetters(),
    get({ items }) {
      return code => items.find(item => item.code === code)
    },
    param({ items }) {
      return code => {
        const item = items.find(item => item.code === code)

        return item
          ? item.type === 'boolean'
            ? item.value
            : item.value || item.default
          : null
      }
    }
  },
  mutations: manageStoreMutations(),
  actions: manageStoreActions('settings')
}
