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

  }

  inject('utils', utils);

}