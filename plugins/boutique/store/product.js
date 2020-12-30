export default {
  actions: {
    async list({}, config) {
      return await this.$apiEs.search('product', config)
    },
  }
}
