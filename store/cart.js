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

const getCardId = async (store) => {
  let cartId = ls.get('cartId');
  if (!cartId) {
    const cartIdResp = await store.dispatch('cart/postCarts')
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
    const cartId = await getCardId(this);
    const cartResp = await apiSylius.get(`/carts/${cartId}`)
    this.commit('cart/set', cartResp);
  },
  async addItem ({}, item) {
    const cartId = await getCardId(this);
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
    const cartResp = await apiSylius.post(`/carts/${cartId}/items`, payload)  
    this.commit('cart/set', cartResp);
  }
}

export const component = {
  computed: {
    cart () {
      return this.$store.state.cart;
    },
    isItems () {
      return this.$store.state.cart?.items?.[0];
    },
    quantity () {
      return this.$store.state.cart?.items?.[0]?.quantity;
    }
  },
  beforeMount() {
    console.log(this.$store.getters['cart/quantity'])
    this.$store.dispatch("cart/getCarts");
  }
}
