import {apiEs} from '~/plugins/api-es'

export const state = {
  all: [],
  tree: [],
}

export const mutations = {
  SET_ALL (state, allCategories) {
    state.all = allCategories;
  },
  SET_TREE (state, categoryTree) {
    state.tree = categoryTree;
  },
}

export const actions = {
  async list ({commit}) {

    var {request, response} = await apiEs.search('category')

    // console.log('xxxxxxxxx rq', response)

    if (response?.hits?.hits) {
      var allCategories = response.hits.hits;
    }

    commit('SET_ALL', allCategories)

    const items = response;
    return items;
  },
}
