import {apiSylius} from '~/plugins/api-sylius'
import {ls} from '~/plugins/ls'

export const state = () => ({
  me: false,
})

export const mutations = {
  SET_ME (state, muUserData) {
    state.me = muUserData;
  },
}

export const getters = {
  token: (state) => () => {
    return ls.get('user--token');
  }
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
        ls.set('user--token', response.result);
        await Promise.all([
          await dispatch('me'),
          await (async () => {
            await this.dispatch('cart/create')
            await this.dispatch('cart/pull')
          })(),
        ])
        return response;
      }
      else {
        return response;
      }
    }
    catch (err) {
      console.error("user/login failed", {err})
    }
    // sylius api
    // try {
    //   params.token = ls.get('cartId');
    //   const resp = await apiSylius.post('/login', params);
    //   ls.set('user--token', resp.token);
    //   dispatch('me');
    //   this.dispatch('cart/getCarts');
    // }
    // catch (err) {
    //   this.$utils.catchHandler(err);
    // }
  },

  async logout ({commit}) {
    ls.set('user--token', false);
    commit('SET_ME', false);
    await this.dispatch('cart/localClear')
    return true;
  }

}
