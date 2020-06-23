import axios from '@/plugins/axios'
import * as types from '../mutation-types'
// import { i18n } from '@/plugins/i18n'

// state
export const state = {
  configured: false,
  csrf: false,
  locale: false,
  locales: false,
  api: false,
  appName: false
}

// getters
export const getters = {
  configured: state => state.configured,
  csrf: state => state.csrf,
  api: state => state.api,
  appName: state => state.appName,
  locale: state => state.locale,
  locales: state => state.locales
}

// mutations
export const mutations = {
  [types.CONFIGURED]  (state, { configured }) {
    state.configured = configured
  },
  [types.CONFIG_CSRF]  (state, { token }) {
    state.csrf = token
  },
  [types.CONFIG_LOCALE]  (state, { locale }) {
    state.locale = locale
  },
  [types.CONFIG_LOCALES]  (state, { locales }) {
    state.locales = locales
  },
  [types.CONFIG_API]  (state, { api }) {
    state.api = api
  },
  [types.CONFIG_APPNAME]  (state, { appName }) {
    state.appName = appName
  }
}

// actions
export const actions = {
  async get ({ commit }) {
    if (state.configured === false) {
      this.dispatch('config/reset')
      const r = await axios.get('/api/handshake.json')
      if (r.status === 200) {
        if (r.data !== undefined) {
          commit(types.CONFIG_CSRF, r.data)
          commit(types.CONFIG_LOCALE, r.data)
          commit(types.CONFIG_LOCALES, r.data)
          commit(types.CONFIG_APPNAME, r.data)
          commit(types.CONFIG_API, r.data)
          delete r.data.token
          window.config = r.data
          commit(types.CONFIGURED, { configured: true })
        }
      } else {
      }
    }
  },
  reset ({ commit }) {
    commit(types.CONFIGURED, { configured: false })
    commit(types.CONFIG_CSRF, { token: false })
    commit(types.CONFIG_LOCALE, { locale: false })
    commit(types.CONFIG_LOCALES, { locales: false })
    commit(types.CONFIG_APPNAME, { appName: false })
    commit(types.CONFIG_API, { api: false })
    window.config = {
      locale: 'en',
      locales: {},
      appName: 'App',
      api: location.protocol + '//' + location.host + '/api/'
    }
  }
}
