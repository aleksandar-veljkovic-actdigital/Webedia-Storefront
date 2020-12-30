import storeRoot from './store/root.js'
import storeAttribute from './store/attribute.js'
import storeCart from './store/cart.js'
import storeCategory from './store/category.js'
import storeOrder from './store/order.js'
import storeProduct from './store/product.js'
import storeUi from './store/ui.js'
import storeUser from './store/user.js'

export default async (ctx, inject) => {
  const { store } = ctx;


  // namespaced stores
  const storeRegisterModule = (namespace, module) => {
    if (!store._modules.root._children[namespace]) {
      store.registerModule(namespace, {
        namespaced: true,
        ...module, 
      })
    }
  }

  // root store (instead of index.js)
  if (!store._modules.root._children['root']) {
    store.registerModule('root', {
      namespaced: false,
      ...storeRoot,
    })
  }

  storeRegisterModule('attribute', storeAttribute)
  storeRegisterModule('cart', storeCart)
  storeRegisterModule('category', storeCategory)
  storeRegisterModule('order', storeOrder)
  storeRegisterModule('product', storeProduct)
  storeRegisterModule('ui', storeUi)
  storeRegisterModule('user', storeUser)

  if (process.client) {
    store.dispatch('clientInit')
  }

};
