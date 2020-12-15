import {actions} from "~/store"

export default (ctx, inject) => {

  if (process.client) {
    // initial vuex states (ssr/csr) shoud be defined within ~/state/index.js
    actions.clientInit(ctx);
  }

}