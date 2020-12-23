export const actions = {

  async create ({}, params={}) {
    const response = await this.$apiBitbag.post('order/create', params);
    return response;
  },

}
