export const state = () => ({
})

export const mutations = {
}

export const actions = {

  async message ({}, {title = "", type = "ok"}) {
    switch (type) {
      case "ok": {
        break;
      }
      case "error": {
        break;

      }
    }
    console.log('ui/message ::', type + ' ::', title)
  }

}
