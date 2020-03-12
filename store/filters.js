export const state = () => ({
  filterOpened: false
})

export const mutations = {
  triggerFilters(state){
    state.filterOpened = !state.filterOpened;
  },
}

export const actions = {
  triggerFilters(context){
    context.commit('triggerFilters');
  }
}