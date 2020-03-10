import axios, { AxiosRequestConfig } from 'axios';
import https from 'https'
import { ls } from './ls';

const apiBase = axios.create({
  baseURL: process.env.API_URL_SYLIUS || 'http://192.168.15.70/shop-api',
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
});

const apiSylius = {

  async get(url, config = { params: {} }) {
    config.headers = {
      'Content-Type': 'application/json;charset=UTF-8',
      // ...authorisation(),
    }
    // config.params = { ...config.params, ...defaultParams };
    const response = await apiBase.get(url, config);
    return response.data;
  },

  async post(url, data = {}, config = {}) {
    config.headers = {
      'Content-Type': 'application/json;charset=UTF-8',
      // ...authorisation(),
    }
    const response = await apiBase.post(url, data, config);
    return response.data;
  },

  async put(url, data = {}, config = {}) {
    config.headers = {
      'Content-Type': 'application/json;charset=UTF-8',
      // ...authorisation(),
    }
    const response = await apiBase.put(url, data, config);
    return response.data;
  },
  
  async patch(url, data = {}, config = {}) {
    config.headers = {
      'Content-Type': 'application/json;charset=UTF-8',
      // ...authorisation(),
    }
    const response = await apiBase.patch(url, data, config);
    return response.data;
  },

  async delete(url, config = {}) {
    config.headers = {
      'Content-Type': 'application/json;charset=UTF-8',
      // ...authorisation(),
    }
    const response = await apiBase.delete(url, config);
    return response.data;
  },

};

export { apiSylius };
