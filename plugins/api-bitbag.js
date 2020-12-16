import axios, { AxiosRequestConfig } from 'axios';
import {config} from '~/config'
import { ls } from './ls';


export default ({app: {i18n}}, inject) => {

  const authorisation = () => {
    const token = ls.get('authToken');
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
      config.headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        ...authorisation(),
      }
      try {
        const response = await apiBase.get(url, config);
        return response.data;
      } catch (err) {
        console.error('apiBitbag get net error', {err})
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
        console.error('apiBitbag get net error', {err})
      }
    },
    
  };

  inject('apiBitbag', apiBitbag);

}

