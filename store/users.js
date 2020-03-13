import {apiSylius} from '~/plugins/api-sylius'
import {ls} from '~/plugins/ls'

export const state = () => ({
  "firstName": "",
  "lastName": "",
  "email": "",
  "birthday": "",
  "gender": "",
  "phoneNumber": "",
  "subscribedToNewsletter": false
})

export const mutations = {
  setMe (state, meResp) {
    this.$utils.modelFill(state, meResp);
  },
}

export const actions = {

  async me () {
    try {
      const meResp = await apiSylius.get('/me');
      this.commit('users/setMe', meResp);
    }
    catch (err) {
      console.log("me is not logged in :: ", err?.response?.data?.message || err)
    }

  },

  async login ({dispatch}, params = {}) {
    // const payload = {
    //   "email": "test@example.com",
    //   "password": "test12334verysecure",
    //   "token": "SDAOSLEFNWU35H3QLI5325"
    // }
    try {
      params.token = ls.get('cartId');
      const resp = await apiSylius.post('/login', params);
      ls.set('authToken', resp.token);
      dispatch('me');
      this.dispatch('cart/getCarts');
    }
    catch (err) {
      this.$utils.catchHandler(err);
    }
  },

}
