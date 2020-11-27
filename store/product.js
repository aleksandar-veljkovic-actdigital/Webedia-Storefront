import { apiEs } from '~/plugins/api-es'

export const actions = {
  async list() {
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
    const rq = await apiEs.search('product', {
      params: {
        source: JSON.stringify(esQuery),
        source_content_type: 'application/json'
      }
    })
    const items = rq;
    return items;
  },
}
