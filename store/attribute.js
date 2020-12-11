export const state = () => ({
  all: [],
});

export const mutations = {
  SET_ALL (state, allAttributes) {
    state.all = allAttributes;
  },
}

export const actions = {
  async fetchAll ({commit}) {
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
    var {request, response, result} = await this.$apiEs.search('attribute', {
      params: {
        source: JSON.stringify(esQuery),
        source_content_type: 'application/json'
      }
    })
    return  {request, response, result};
  },
}