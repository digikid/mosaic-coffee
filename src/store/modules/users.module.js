import axios from 'axios'

import db from '@/api/db'

import { manageStoreGetters } from '@/store/utils/getters'
import { manageStoreMutations } from '@/store/utils/mutations'
import { manageStoreActions } from '@/store/utils/actions'

import { useStorage } from '@/use/storage/storage'
import { useLocalStorage } from '@/use/storage/local'
import { error, success } from '@/utils/system/toast'
import { access } from '@/store/utils/access'

const { remove: removeFile } = useStorage()

const _storage = useLocalStorage()

const {
  VUE_APP_AUTH_SIGN_IN_URL: SIGN_IN_URL,
  VUE_APP_AUTH_SIGN_UP_URL: SIGN_UP_URL,
  VUE_APP_AUTH_UPDATE_URL: UPDATE_URL,
  VUE_APP_AUTH_DELETE_URL: DELETE_URL,
  VUE_APP_FIREBASE_API_KEY: FIREBASE_KEY
} = process.env

export default {
  namespaced: true,
  state() {
    return {
      items: [],
      empty: {
        name: '',
        email: '',
        password: '',
        thumb: '',
        thumbUrl: '',
        permissions: {
          events: {
            read: true,
            edit: false
          },
          greetings: {
            read: true,
            edit: false
          },
          partners: {
            read: true,
            edit: false
          },
          socials: {
            read: true,
            edit: false
          },
          contacts: {
            read: true,
            edit: false
          },
          users: {
            read: true,
            edit: false
          },
          settings: {
            read: true,
            edit: false
          }
        }
      },
      current: _storage.get('USER_ID')
    }
  },
  getters: {
    ...manageStoreGetters(),
    current({ items, current }) {
      return items.find(({ id }) => id === current)
    }
  },
  mutations: {
    ...manageStoreMutations(),
    set(state, id) {
      state.current = id

      _storage.set('USER_ID', id)
    },
    reset(state) {
      state.current = null

      _storage.remove('USER_ID')
    }
  },
  actions: {
    ...manageStoreActions('users'),
    async add({ state, commit }, payload) {
      if (!payload) return

      if (!access('users', 'edit')) {
        error('ACCESS_DENIED')

        return
      }

      const { email, password } = payload

      if (state.items.findIndex(item => item.email === email) > -1) {
        error('USERS_EMAIL_EXISTS')

        return
      }

      try {
        const { data } = await axios.post(SIGN_UP_URL + FIREBASE_KEY, {
          email,
          password,
          returnSecureToken: true
        })

        const { localId: id } = data

        await db.patch(`/users/${id}.json`, payload)

        commit('add', {
          id,
          ...payload
        })

        success('USERS_ADD_SUCCESS')
      } catch (e) {
        error('USERS_ADD_FAILED')
      }
    },
    async update({ getters, commit }, payload) {
      if (!payload) return

      if (!access('users', 'edit')) {
        error('ACCESS_DENIED')

        return
      }

      const { id, ...item } = payload
      const { email, password, thumbUrl } = item
      const { current } = getters

      const prev = getters.get(payload.id)

      try {
        if (email !== prev.email || password !== prev.password) {
          const { data } = await axios.post(SIGN_IN_URL + FIREBASE_KEY, {
            email: prev.email,
            password: prev.password,
            returnSecureToken: true
          })

          const { idToken } = data

          const { data: updated } = await axios.post(
            UPDATE_URL + FIREBASE_KEY,
            {
              idToken,
              email,
              password,
              returnSecureToken: true
            }
          )

          if (current.id === id) {
            const {
              idToken: tokenId,
              refreshToken: refreshId,
              expiresIn
            } = updated

            commit(
              'auth/setToken',
              { tokenId, refreshId, expiresIn },
              {
                root: true
              }
            )
          }
        }

        if (thumbUrl !== prev.thumbUrl && prev.thumbUrl) {
          await removeFile(prev.thumbUrl)
        }

        await db.patch(`/users/${id}.json`, item)

        commit('update', payload)

        if (payload.thumb === prev.thumb) {
          success('USERS_UPDATE_SUCCESS')
        }
      } catch (e) {
        error('USERS_UPDATE_FAILED')
      }
    },
    async remove({ getters, commit }, id) {
      if (!id) return

      if (!access('users', 'edit')) {
        error('ACCESS_DENIED')

        return
      }

      const { current } = getters

      if (id === current.id) {
        error('USERS_REMOVE_SELF_FAILED')

        return
      }

      const { email, password, thumbUrl } = getters.get(id)

      try {
        const { data } = await axios.post(SIGN_IN_URL + FIREBASE_KEY, {
          email,
          password,
          returnSecureToken: true
        })

        const { idToken } = data

        await axios.post(DELETE_URL + FIREBASE_KEY, {
          idToken
        })

        await db.delete(`/users/${id}.json`)

        if (thumbUrl) {
          await removeFile(thumbUrl)
        }

        commit('remove', id)

        success('USERS_REMOVE_SUCCESS')
      } catch (e) {
        error('USERS_REMOVE_FAILED')
      }
    }
  }
}
