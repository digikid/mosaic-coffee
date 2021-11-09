import { manageStoreGetters } from '@/store/utils/getters'
import { manageStoreMutations } from '@/store/utils/mutations'
import { manageStoreActions } from '@/store/utils/actions'

export default {
  namespaced: true,
  state() {
    return {
      items: [],
      categories: [
        {
          title: 'Телефон',
          value: 'phone'
        },
        {
          title: 'Email',
          value: 'email'
        },
        {
          title: 'Ссылка на сайт',
          value: 'url'
        }
      ],
      empty: {
        active: true,
        category: '',
        value: ''
      }
    }
  },
  getters: {
    ...manageStoreGetters(),
    items({ items }) {
      return items.concat().reverse()
    },
    categories({ categories }) {
      return categories
    }
  },
  mutations: manageStoreMutations(),
  actions: manageStoreActions('contacts')
}
