import {apiSylius} from '~/plugins/api-sylius'
import {ls} from '~/plugins/ls'

export const state = () => ({
  tokenValue: false,
  channel: "",
  currency: "",
  locale: "",
  checkoutState: "",
  items: [],
  totals: {total: 0, items: 0, taxes: 0, shipping: 0, promotion: 0},
  payments: [],
  shipments: [],
  cartDiscounts: [],
})

export const mutations = {
  set (state, cardResp) {
    this.$utils.modelFill(state, cardResp);
  },
}

const getCardId = async () => {
  let cartId = ls.get('cartId');
  if (!cartId) {
    const cartIdResp = await this.dispatch('cart/postCarts')
    cartId = cartIdResp.tokenValue;
    ls.set('cartId', cartId);
  }
  return cartId;
}

export const actions = {
  async postCarts () {
    const resp = await apiSylius.post('/carts')
    return resp;
  },
  async getCarts () {
    const cartId = await getCardId();
    const cartResp = await apiSylius.get(`/carts/${cartId}`)
    this.commit('cart/set', cartResp);
  },
  async addItem ({}, item) {
    console.log(item)
    const cartId = await getCardId();
    // @toDo 
    const payload = {
      "productCode": item.code,
      "quantity": 1,
      // "variantCode": "SMALL_LOGAN_T_SHIRT_CODE",
      // "options": {
      //   "additionalProp1": "HAT_SIZE_S",
      //   "additionalProp2": "HAT_SIZE_S",
      //   "additionalProp3": "HAT_SIZE_S"
      // }
    }
    const resp = await apiSylius.post(`/carts/${cartId}/items`, payload)
    console.log('--- addItem ---', resp)
  }
}
