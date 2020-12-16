import axios, { AxiosRequestConfig } from 'axios';
import {config} from '~/config'
import { ls } from './ls';


export default ({app: {i18n}}, inject) => {

  const authorisation = () => {
    const token = ls.get('user--token');
    if (token) {
      return {'Authorization': "Bearer " + token,}
    }
    else {
      return {};
    }
  }

  const apiBase = axios.create({
    baseURL: config.sylius.bitbag_api,
    // headers: {'Content-Type': 'application/json;charset=UTF-8'},
  });
  
  const apiBitbag = {

    async get(url, config = {}) {
      config.params = {
          cartId: ls.get('cart--id'), 
          token: ls.get('user--token'), 
          storeCode: i18n.locale,
          ...config.params
      }
      config.headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        ...authorisation(),
      }
      try {
        const response = await apiBase.get(url, config);
        return response.data;
      } catch (err) {
        // console.error('apiBitbag get net error', {err})
        return err;
      }
    },

    async post(url, data = {}, config = {}) {
      config.headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        ...authorisation(),
      }
      try {
        const response = await apiBase.post(url, data, config);
        return response.data;
      } catch (err) {
        // console.error('apiBitbag get net error', {err})
        return err;
      }
    },
    
  };

  inject('apiBitbag', apiBitbag);

}

