import storeAttribute from './store/attribute.js'

export default async ({ store }, inject) => {

  const storeRegisterModule = (namespace, module) => {
    if (!store._modules.root._children[namespace]) {
      store.registerModule(namespace, {
        namespaced: true,
        ...module, 
      })
    }
  }

  storeRegisterModule('attribute', storeAttribute)

};
