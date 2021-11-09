import { manageStoreGetters } from '@/store/utils/getters'
import { manageStoreActions } from '@/store/utils/actions'
import { manageStoreMutations } from '@/store/utils/mutations'

export default {
  namespaced: true,
  state() {
    return {
      items: [],
      categories: [
        {
          title: 'Узнать больше',
          value: 'page'
        },
        {
          title: 'Копить бонусы',
          value: 'cashback'
        },
        {
          title: 'Поделиться мнением',
          value: 'reviews'
        }
      ],
      empty: {
        active: true,
        category: 'page',
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
    },
    categories({ categories }) {
      return categories.concat().reverse()
    }
  },
  mutations: manageStoreMutations(),
  actions: manageStoreActions('socials')
}
