import {apiSylius} from '~/plugins/api-sylius'


export const actions = {
  async postCarts () {
    const rq = await apiSylius.get('/carts/')
    console.log(carts);
    //const items = rq.items;
    //return items;
  },
}
