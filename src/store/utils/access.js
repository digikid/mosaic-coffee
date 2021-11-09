import store from '@/store'

export const access = (id, action = 'read') => {
  const { permissions } =
    store.getters['users/current'] || store.getters['users/empty']

  return permissions[id][action]
}
