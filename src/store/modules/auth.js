import axios from '@/plugins/axios'
import * as types from '../mutation-types'

// state
export const state = {
  handshake: false
}

// getters
export const getters = {
  handshake: state => state.handshake
}

// mutations
export const mutations = {
  [types.HANDSHAKE]  (state, { handshake }) {
    state.handshake = handshake
  }
}

// actions
export const actions = {
  async handshake ({ commit }) {
    if (state.handshake === false) {
      await axios.get('api/handshake.json').then((r) => {
        if (r.status === 200 && r.data !== undefined) {
          window.config = r.data
          commit(types.HANDSHAKE, true)
        }
      })
    }
  }
}
