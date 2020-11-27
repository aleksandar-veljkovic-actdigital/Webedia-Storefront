import axios, { AxiosRequestConfig } from 'axios';

const apiBase = axios.create({
  baseURL: process.env.ES_ENDPOINT,
  headers: {'Content-Type': 'application/json'},
  // withCredentials: true,
  // httpsAgent: new https.Agent({
  //   rejectUnauthorized: false,
  // })
});

const apiEs = {

  async search(indexName, config = { params: {} }) {
    // config.headers = {
    //   'Content-Type': 'application/json;charset=UTF-8',
    // }
    const response = await apiBase.get(`/vue_storefront_catalog_${indexName}/_search`, config);
    return response.data;
  },

  async post(url, data = {}, config = {}) {
    config.headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    }
    const response = await apiBase.post(url, data, config);
    return response.data;
  },

};

export { apiEs };
