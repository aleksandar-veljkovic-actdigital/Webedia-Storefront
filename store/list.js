import {apiSylius} from '~/plugins/api-sylius'


export const actions = {
  async fetch () {
    const rq = await apiSylius.get('/product-latest/')
    const items = rq.items;
    return items;
  },
}
