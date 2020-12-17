export const state = () => ({
  all: [],
  tree: [],
});

export const mutations = {
  SET_ALL (state, allCategories) {
    state.all = allCategories;
  },
  SET_TREE (state, allCategories) {
    const _allCategories = JSON.parse(JSON.stringify(allCategories))
    const families = _allCategories.map( category => {
      category.children_data = category.children_data.map( child => {
        return _allCategories.find( mabyChild => mabyChild.id === child.id )
      });
      return category;
    });
    const rootTree = _allCategories.filter( category => !category.parent_id);
    state.tree = rootTree;
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
    var esData = await this.$apiEs.search('category', {
      params: {
        source: JSON.stringify(esQuery),
        source_content_type: 'application/json'
      }
    })
    return  esData;
  },
}
