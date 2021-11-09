import { manageStoreGetters } from '@/store/utils/getters'
import { manageStoreMutations } from '@/store/utils/mutations'
import { manageStoreActions } from '@/store/utils/actions'

export default {
  namespaced: true,
  state() {
    return {
      items: [],
      empty: {
        active: true,
        text: ''
      }
    }
  },
  getters: {
    ...manageStoreGetters(),
    items({ items }) {
      return items.concat().reverse()
    }
  },
  mutations: manageStoreMutations(),
  actions: manageStoreActions('greetings')
}
