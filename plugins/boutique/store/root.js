export default {

  namespaced: false,
  
  actions: {

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

    async clientInit({ dispatch, commit, getters }) {
      console.log('xxxxxxxxx clientInit BQ')
      const userToken = getters['user/token']();
      const cartId = getters['cart/id']();
      if (userToken) {
        const userMe = await dispatch("user/me") // userToken check
        if (userMe.result) {
          await dispatch('cart/create')
          await dispatch('cart/pull')
        }
      }
      else if (cartId) {
        await dispatch('cart/pull')
      }
    }

  }

}
