export default {

  state: () => ({
    all: [],
    loc: 'bout'
  }),

  mutations: {

    SET_ALL (state, allAttributes) {
      state.all = allAttributes;
    },
    
  },

  actions: {

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
      var esData = await this.$apiEs.search('attribute', {
        params: {
          source: JSON.stringify(esQuery),
          source_content_type: 'application/json'
        }
      })
      return  esData;
    },

  },

}
