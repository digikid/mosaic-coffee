import store from '@/store'
import { error } from '@/utils/system/toast'

export const access = async (id, action = 'read') => {
  const { permissions } =
    store.getters['users/current'] || store.getters['users/empty']

  return new Promise(resolve => {
    if (permissions[id][action]) {
      resolve(true)
    } else {
      error('ACCESS_DENIED', id)

      resolve(false)
    }
  })
}
