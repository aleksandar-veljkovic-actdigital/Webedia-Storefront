import {ls} from '~/plugins/ls'

export const actions = {

  async nuxtServerInit({ dispatch, commit }) {
    // @toDo :: ssr cache should goes hire
    await Promise.all([
      await (async () => {
        const {result: attributes} = await dispatch('attribute/fetchAll')
        commit('attribute/SET_ALL', attributes)

      })(),
      await (async () => {
        const {result: categories} = await dispatch('category/fetchAll')
        commit('category/SET_ALL', categories)
        commit('category/SET_TREE', categories)
      })(),
    ])
  },

  async clientInit({store}) {
    const userToken = store.getters['user/token']();
    const cartId = store.getters['cart/id']();
    if (userToken) {
      const userMe = await store.dispatch("user/me") // userToken check
      if (userMe.result) {
        await store.dispatch('cart/create')
        await store.dispatch('cart/pull')
      }
    }
    else if (cartId) {
      await store.dispatch('cart/pull')
    }
  }

}