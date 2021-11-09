import db from '@/api/db'

import { toast } from '@/utils/system/toast'
import { message } from '@/utils/system/message'
import { access } from '@/store/utils/access'

const success = (module, code) =>
  toast.success(message(`${module === 'settings' ? 'SETTINGS_' : ''}${code}`))

const error = (module, code) =>
  toast.error(message(`${module === 'settings' ? 'SETTINGS_' : ''}${code}`))

export const manageStoreActions = module => {
  const load = async ({ commit }) => {
    try {
      const { data } = await db.get(`/${module}.json`)

      if (data) {
        const items = Object.keys(data).map(id => ({
          ...data[id],
          id
        }))

        commit('load', items)
      } else {
        commit('load', [])
      }
    } catch (e) {
      commit('load', [])

      error(module, 'LOADING_FAILED')
    }
  }

  const add = async ({ commit }, payload) => {
    if (!payload) return

    if (!access(module, 'edit')) {
      error(module, 'ACCESS_DENIED')

      return
    }

    const item = payload

    try {
      const { data } = await db.post(`/${module}.json`, item)

      if (data) {
        commit('add', {
          id: data.name,
          ...item
        })

        success(module, 'ADD_SUCCESS')
      } else {
        error(module, 'ADD_FAILED')
      }
    } catch (e) {
      error(module, 'ADD_FAILED')
    }
  }

  const update = async ({ commit, state }, payload) => {
    if (!payload) return

    if (!access(module, 'edit')) {
      error(module, 'ACCESS_DENIED')

      return
    }

    try {
      if (Array.isArray(payload)) {
        const data = {}
        const items = [...state.items, ...payload]

        items.forEach(param => {
          const { id, ...item } = param

          data[id] = item
        })

        await db.patch(`/${module}.json`, data)

        commit('load', items)
      } else {
        const { id, ...item } = payload

        await db.patch(`/${module}/${id}.json`, item)

        commit('update', payload)
      }

      success(module, 'UPDATE_SUCCESS')
    } catch (e) {
      error(module, 'UPDATE_FAILED')
    }
  }

  const remove = async ({ commit }, id) => {
    if (!id) return

    if (!access(module, 'edit')) {
      error(module, 'ACCESS_DENIED')

      return
    }

    try {
      await db.delete(`/${module}/${id}.json`)

      commit('remove', id)

      success(module, 'REMOVE_SUCCESS')
    } catch (e) {
      error(module, 'REMOVE_FAILED')
    }
  }

  return {
    load,
    add,
    update,
    remove
  }
}
