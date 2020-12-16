import {ls} from '~/plugins/ls'

export const state = () => ({
  items: undefined,
  totals: undefined,
})

export const mutations = {
  SET_ITEMS (state, items) {
    state.items = items;
  }

}

export const actions = {

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
    return response;
  },

}
