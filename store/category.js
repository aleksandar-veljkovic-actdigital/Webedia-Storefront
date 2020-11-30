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

    var rq = await apiEs.search('category')

    console.log('xxxxxxxxx rq', rq)


    if (rq?.hits?.hits) {
      var allCategories = rq.hits.hits;
    }

    

    commit('SET_ALL', allCategories)

    const items = rq;
    return items;
  },
}
