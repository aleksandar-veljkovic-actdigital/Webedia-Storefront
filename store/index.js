import {ls} from '~/plugins/ls'

export const actions = {

  async nuxtServerInit({ dispatch, commit }) {
    // @toDo :: ssr cache should goes hire
    const {result: attributes} = await dispatch('attribute/fetchAll')
    commit('attribute/SET_ALL', attributes)
    const {result: categories} = await dispatch('category/fetchAll')
    commit('category/SET_ALL', categories)
    commit('category/SET_TREE', categories)
  },

  async clientInit({store}) {
    const lsUserToken = ls.get('user--token');
    const lsCartId = ls.get('cart--id');
    if (lsUserToken) {
      const userMe = await store.dispatch("user/me")
      if (userMe.result) {
        await store.dispatch('cart/create')
        await store.dispatch('cart/pull')
      }
    }
    else if (lsCartId) {
      const cartPull = await store.dispatch('cart/pull')
      if (cartPull?.response?.status == 401) {
        ls.set('cart--id', false)
      }
    }
  }

}