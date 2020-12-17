import {ls} from '~/plugins/ls'

export const actions = {

  async nuxtServerInit({ dispatch, commit }) {
    const error = this.app.nuxt.error;
    // @toDo :: ssr cache should goes hire
    await Promise.all([
      await (async () => {
        const {result: attributes} = await dispatch('attribute/fetchAll')
        if (attributes) {
          commit('attribute/SET_ALL', attributes)
        }
        else {
          error({ statusCode: 500, message: 'ES Attributes Unavalible' })
        }
      })(),
      await (async () => {
        const {result: categories} = await dispatch('category/fetchAll')
        if (categories) {
          commit('category/SET_ALL', categories)
          commit('category/SET_TREE', categories)
        }
        else {
          error({ statusCode: 500, message: 'ES Categories Unavalible' })
        }
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