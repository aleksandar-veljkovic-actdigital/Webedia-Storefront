import axios, { AxiosRequestConfig } from 'axios';
import {config} from '~/config'

const apiBase = axios.create({
  baseURL: config.elasticsearch.api,
  baseURL: "http://localhost:3000/api/es",
  // headers: {'Content-Type': 'application/json;charset=UTF-8'},
});

const apiEs = {

  async search(indexName, config = { params: {} }) {
    // config.headers = {
    //   'Content-Type': 'application/json;charset=UTF-8',
    // }
    try {
      var request = await apiBase.get(`/vue_storefront_catalog_${indexName}/_search`, config);
    }
    catch (err) {
      console.error("ES Failed", {err})
      var request = err.response
    }
    return {
      request,
      response: request?.data,
    };
  },
  
};

export { apiEs };
