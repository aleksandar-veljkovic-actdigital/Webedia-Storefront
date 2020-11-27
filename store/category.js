import {apiEs} from '~/plugins/api-es'


export const actions = {
  async list () {
    const esQuery = {

    }
    const rq = await apiEs.search('category')
    console.log('xxxxxxxxx category/a/list', rq)
    const items = rq;
    return items;
  },
}
