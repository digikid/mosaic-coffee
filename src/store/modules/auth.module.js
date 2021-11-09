import axios from 'axios'

import { error, warning } from '@/utils/system/toast'
import { useLocalStorage } from '@/use/storage/local'

const _storage = useLocalStorage()

const {
  VUE_APP_AUTH_SIGN_IN_URL: SIGN_IN_URL,
  VUE_APP_AUTH_SIGN_UP_URL: SIGN_UP_URL,
  VUE_APP_AUTH_REFRESH_URL: REFRESH_URL,
  VUE_APP_FIREBASE_API_KEY: FIREBASE_KEY,
  VUE_APP_LOCAL_JWT_TOKEN: JWT_TOKEN,
  VUE_APP_LOCAL_REFRESH_TOKEN: REFRESH_TOKEN,
  VUE_APP_LOCAL_EXPIRES_DATE: EXPIRES_DATE
} = process.env

export default {
  namespaced: true,
  state() {
    return {
      tokenId: _storage.get(JWT_TOKEN),
      refreshId: _storage.get(REFRESH_TOKEN),
      expiresDate: new Date(_storage.get(EXPIRES_DATE))
    }
  },
  getters: {
    token(state) {
      return state.tokenId
    },
    isAuthenticated(state) {
      return !!state.tokenId
    },
    isExpired(state) {
      return new Date() >= state.expiresDate
    }
  },
  mutations: {
    setToken(state, { tokenId, refreshId, expiresIn = '3600' }) {
      const expiresDate = new Date(
        new Date().getTime() + Number(expiresIn) * 1000
      )

      state.tokenId = tokenId
      state.refreshId = refreshId
      state.expiresDate = expiresDate

      _storage.set(JWT_TOKEN, tokenId)
      _storage.set(REFRESH_TOKEN, refreshId)
      _storage.set(EXPIRES_DATE, expiresDate.toString())
    },
    logout(state) {
      state.tokenId = null
      state.refreshId = null
      state.expiresDate = null

      _storage.remove(JWT_TOKEN)
      _storage.remove(REFRESH_TOKEN)
      _storage.remove(EXPIRES_DATE)
    }
  },
  actions: {
    async signIn({ commit, dispatch }, payload) {
      try {
        const { data } = await axios.post(SIGN_IN_URL + FIREBASE_KEY, {
          ...payload,
          returnSecureToken: true
        })

        await dispatch('users/load', null, {
          root: true
        })

        const {
          idToken: tokenId,
          refreshToken: refreshId,
          expiresIn,
          localId: id
        } = data

        commit('setToken', {
          tokenId,
          refreshId,
          expiresIn
        })

        commit('users/set', id, {
          root: true
        })
      } catch (e) {
        error(e.response.data.error.message)
      }
    },
    async signUp({ commit }, payload) {
      try {
        const { data } = await axios.post(SIGN_UP_URL + FIREBASE_KEY, {
          ...payload,
          returnSecureToken: true
        })

        const {
          idToken: tokenId,
          refreshToken: refreshId,
          expiresIn,
          localId: id
        } = data

        commit('setToken', {
          tokenId,
          refreshId,
          expiresIn
        })

        commit('users/set', id, {
          root: true
        })
      } catch (e) {
        error(e.response.data.error.message)
      }
    },
    async refresh({ state, commit }) {
      try {
        const { data } = await axios.post(REFRESH_URL + FIREBASE_KEY, {
          grant_type: 'refresh_token',
          refresh_token: state.refreshId
        })

        const {
          id_token: tokenId,
          refresh_token: refreshId,
          expires_in: expiresIn
        } = data

        commit('setToken', {
          tokenId,
          refreshId,
          expiresIn
        })
      } catch (e) {
        warning('REFRESH_TOKEN_WARNING')
      }
    }
  }
}
