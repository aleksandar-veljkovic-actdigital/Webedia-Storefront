import {ls} from '@core/plugins/ls'

const defaultState = {
  id: false,
  items: [],
  totals: {},
}

export default {

  state: () => (defaultState),

  getters: {
    id: () => () => {
      return ls.get('cart--id');
    }
  },

  mutations: {

    SET_ID (state, id) {
      state.id = id;
    },

    SET_ITEMS (state, items) {
      state.items = items;
    },

    LOAD_EMPTY_STATE (state) {
      Object.assign(state, defaultState)
    }

  },

  actions: {

    async create ({}, params={}) {
      const response = await this.$apiBitbag.post('cart/create', params);
      if (response.result) {
        ls.set('cart--id', response.result)
      }
      return response;
    },

    async pull ({commit}, params={}) {
      const response = await this.$apiBitbag.get('cart/pull', params);
      const items = response.result;
      commit('SET_ITEMS', items)
      commit('SET_ID', ls.get('cart--id'))
      
      return response;
    },

    async localClear ({commit}) {
      ls.set('cart--id', false)
      commit('LOAD_EMPTY_STATE')
    }

  },

}
