export const state = () => ({
  filterOpened: false
})

export const mutations = {
  openFilters(state){
    this.filterOpened = true;
  }
}

export const actions = {
  openFilters(context){
    context.commit(openFilters);
  }
}