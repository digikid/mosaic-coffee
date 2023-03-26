import db from '@/api/db'

import { success, error } from '@/utils/system/toast'
import { access } from '@/store/utils/access'
import { getTimestamp } from '@/utils/date'

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

      error('LOADING_FAILED', module)
    }
  }

  const patch = async ({ commit, state }, payload) => {
    if (payload && (await access(module, 'edit'))) {
      const items = [...state.items, ...payload]
      const data = {}

      items.forEach(item => {
        const { id, ...meta } = item

        data[id] = meta
      })

      try {
        await db.patch(`/${module}.json`, data)

        commit('load', items)

        success('PATCH_SUCCESS', module)
      } catch (e) {
        error('PATCH_FAILED', module)
      }
    }
  }

  const add = async ({ commit, state }, payload) => {
    if (payload && (await access(module, 'edit'))) {
      if (Array.isArray(payload)) {
        await patch(
          { commit, state },
          payload.map((item, order) => ({
            createDt: getTimestamp(),
            order,
            ...item
          }))
        )
      } else {
        try {
          payload.createDt = getTimestamp()

          const { data } = await db.post(`/${module}.json`, payload)

          if (data) {
            commit('add', {
              id: data.name,
              order: state.items.length,
              ...payload
            })

            success('ADD_SUCCESS', module)
          } else {
            error('ADD_FAILED', module)
          }
        } catch (e) {
          error('ADD_FAILED', module)
        }
      }
    }
  }

  const update = async ({ commit, state }, payload) => {
    if (payload && (await access(module, 'edit'))) {
      if (Array.isArray(payload)) {
        await patch(
          { commit, state },
          payload.map(item => ({
            updateDt: getTimestamp(),
            ...item
          }))
        )
      } else {
        payload.updateDt = getTimestamp()

        const { id, ...item } = payload

        try {
          await db.patch(`/${module}/${id}.json`, item)

          commit('update', payload)

          success('UPDATE_SUCCESS', module)
        } catch (e) {
          error('UPDATE_FAILED', module)
        }
      }
    }
  }

  const remove = async ({ commit }, id) => {
    if (id && (await access(module, 'edit'))) {
      try {
        await db.delete(`/${module}/${id}.json`)

        commit('remove', id)

        success('REMOVE_SUCCESS', module)
      } catch (e) {
        error('REMOVE_FAILED', module)
      }
    }
  }

  const removeAll = async ({ commit }, silent = false) => {
    if (await access(module, 'edit')) {
      try {
        await db.put(`/${module}.json`, [])

        commit('removeAll')

        if (!silent) {
          success('REMOVE_ALL_SUCCESS', module)
        }
      } catch (e) {
        error('REMOVE_ALL_FAILED', module)
      }
    }
  }

  return {
    load,
    add,
    update,
    remove,
    removeAll
  }
}
