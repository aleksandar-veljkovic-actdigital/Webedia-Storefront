import axios, { AxiosRequestConfig } from 'axios';
import {config} from '~/config'

const apiBase = axios.create({
  baseURL: config.elasticsearch.api,
  baseURL: "http://localhost:3000/api/es",
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
    try {
      var response = await apiBase.get(`/vue_storefront_catalog_${indexName}/_search`, config);
    }
    catch (err) {
      console.error("ES Failed", {err})
      var response = err.response
    }
    return {
      response,
      payload: response?.data?.hits,
    };
  },
  
};

export { apiEs };
