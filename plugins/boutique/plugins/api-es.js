import axios, { AxiosRequestConfig } from 'axios';
import {config} from '~/config'


export default ({app: {i18n}}, inject) => {

  const apiBase = axios.create({
    baseURL: config.elasticsearch.api,
    // headers: {'Content-Type': 'application/json;charset=UTF-8'},
  });
  
  const apiEs = {

    async search(indexName, config) {
      // config.headers = {
      //   'Content-Type': 'application/json;charset=UTF-8',
      // }
      try {
        const {esStoreCode} = i18n.locales.find(localeCandidate => localeCandidate.code == i18n.locale);
        var request = await apiBase.get(`/vue_storefront_catalog${esStoreCode ? "_" + esStoreCode : ""}_${indexName}/_search`, config);
      }
      catch (err) {
        console.error("ES Failed", {err})
        var request = err.response
      }
      return {
        request,
        response: request?.data,
        result: request?.data?.hits?.hits?.map((hit)=>hit._source),
        aggregations: request?.data?.aggregations,
      };
    },
    
  };

  inject('apiEs', apiEs);

}

