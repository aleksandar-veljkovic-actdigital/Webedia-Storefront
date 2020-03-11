export default ({}, inject) => {

  const utils = {

    modelFill: (model, data) => {
      data = data || {};
      for (let key in model) {
        if ( typeof(data[key]!=="undefined")  ){
          model[key] = data[key];
        }
      }  
      return model;
    },

    msg: (text) => {
      alert(text)
    },

    err: (text) => {
      alert("Error: " + text)
    },

    catchHandler: (err) => {
      if (err?.response?.data?.message) {
        utils.err(err.response.data.message)
      }
      else {
        throw(err)
      }
    },

  }

  inject('utils', utils);

}