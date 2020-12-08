import { apiEs } from '~/plugins/api-es'

export const actions = {
  async list({}, config) {
    return await apiEs.search('product', config)
  },
}
