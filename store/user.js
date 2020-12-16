import {apiSylius} from '~/plugins/api-sylius'
import {ls} from '~/plugins/ls'

export const state = () => ({
  me: null,
})

export const mutations = {
  SET_ME (state, muUserData) {
    state.me = muUserData;
  },
}

export const actions = {

  async me () {
    // bitbag vsbridge
    const response = await this.$apiBitbag.get('user/me');
    this.commit('user/SET_ME', response.result);
    return response;
    // sylius api
    // try {
    //   const meResp = await apiSylius.get('/me');
    //   this.commit('users/setMe', meResp);
    // }
    // catch (err) {
    //   console.log("me is not logged in :: ", err?.response?.data?.message || err)
    // }
  },

  async login ({dispatch}, params = {}) {
    // bitbag vsbridge
    try {
      const response = await this.$apiBitbag.post('user/login', params);
      if (response?.code == 200) {
        ls.set('authToken', response.result);
        dispatch('me');
      }
      else {
        dispatch('logout')
      }
    }
    catch (err) {
      console.error("user/login failed", {err})
    }
    // sylius api
    // try {
    //   params.token = ls.get('cartId');
    //   const resp = await apiSylius.post('/login', params);
    //   ls.set('authToken', resp.token);
    //   dispatch('me');
    //   this.dispatch('cart/getCarts');
    // }
    // catch (err) {
    //   this.$utils.catchHandler(err);
    // }

  },

  async logout () {
    ls.set('authToken', false);
    this.commit('user/SET_ME', null);
  }

}
