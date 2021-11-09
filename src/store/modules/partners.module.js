import { manageStoreMutations } from '@/store/utils/mutations'
import { manageStoreGetters } from '@/store/utils/getters'
import { manageStoreActions } from '@/store/utils/actions'

export default {
  namespaced: true,
  state() {
    return {
      items: [],
      empty: {
        active: true,
        title: '',
        thumb: '',
        thumbUrl: '',
        url: ''
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
  actions: manageStoreActions('partners')
}
