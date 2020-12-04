import { apiEs } from '~/plugins/api-es'

export const actions = {
  async list({}, config) {
    let esQuery = {
      "query": {
        "bool": {
          "must": [
            {
              "match_all": {}
            }
          ],
          "must_not": [],
          "should": []
        }
      },
      "from": 0,
      "size": 5000,
      "sort": [],
      "aggs": {}
    }
    const rq = await apiEs.search('product', config)
    const items = rq;
    return items;
  },
}
