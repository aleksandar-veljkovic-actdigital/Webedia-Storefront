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
    const myUserData = await store.dispatch("user/me");
    console.log("xxxxxxxxx store client init", {myUserData})
  }

}