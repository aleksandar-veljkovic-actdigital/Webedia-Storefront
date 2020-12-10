<template>
  <main class="p--catalogue">

    <div class="top">
      <h1>{{category.name}}</h1>
      <div class="drops">
        <select>
          <option>a</option>
          <option>b</option>
        </select>
        <select>
          <option>c</option>
          <option>d</option>
        </select>
      </div>
    </div>

    <div class="middle">
      <section class="aside">
        <Categories :categories="$store.state.category.tree"/>
        <h2>Filter by Concern</h2>
        <CatalogFilterCheckbox  code="concerns" :aggregations="productAggregations.agg_terms_concerns" @changed="modifyFilters('concerns', $event)"/>
        <h2>Filter by Skin Type</h2>
        <CatalogFilterCheckbox  code="skin_type" :aggregations="productAggregations.agg_terms_skin_type" @changed="modifyFilters('skin_type', $event)"/>
        <h2>Filter by Texture</h2>
        <CatalogFilterCheckbox  code="texture" :aggregations="productAggregations.agg_terms_texture" @changed="modifyFilters('texture', $event)"/>
      </section>
      <section class="main">
        <article
        v-for="(product, index) in products"
        :key="`sh-list-item-${index}`">
          <ProductItem :product="product" />
        </article>
      </section>
    </div> 

  </main>
</template>

<script>
import { mapGetters } from 'vuex'

import Logo from '~/components/Logo.vue'
import ProductItem from '~/components/product/product-item.vue'
import CatalogFilterCheckbox from '~/components/product/filters.vue'
import Categories from '~/components/categories.vue'

export default {
  name: 'shop',
  components: {
    Logo,
    ProductItem,
    CatalogFilterCheckbox,
    Categories,
  },

  data () { return {
    selectedFilters: {},
  }},

  async asyncData ({store, route}) {
    const path = route.path.replace(/^\//, "").replace(/\/$/, "")
    const categorySlug = [...path.split("/")]?.pop();
    const categoryId = parseInt(categorySlug) || 6 // @toDo <---- root category *1--multitilateral
    const category = store.state.category.all.find(category => category.id == categoryId)
    const {result: products, aggregations: producAaggregations} = await fetchProducts({
      store,
      category_ids: [categoryId],
    });
    ///////// PAGE DATA /////////
    let data = {};
    data.products = products;
    data.productAggregations = producAaggregations;
    data.category = category;
    return data;
  },

  methods: {

    async modifyFilters (name, ids) {
      if (ids.length > 0) {
        this.selectedFilters[name] = ids;
      }
      else {
        delete this.selectedFilters[name];
      }
      ({result: this.products, aggregations: this.productAggregations} = await fetchProducts({
        store: this.$store,
        category_ids: [this.category.id],
        selectedFilters: this.selectedFilters,
      }));
    }

  },

}

const fetchProducts = async ({store, category_ids = [], selectedFilters = {}}) => {
  const esQuery = {
    size: 12,
    sort: [{updated_at: {order: "desc"}}],
    "query": {
      "bool": {
        "filter": {
          "bool": {
            "must": [
              {"terms": {"visibility": [2, 3, 4]}},
              {"terms": {"status": [0,1]}},
              {"terms": {category_ids}},
            ],
            "should": [
              {"bool": {
                  "must": Object.keys(selectedFilters).map(filterName => { return {
                    "terms": {[filterName]: selectedFilters[filterName]}
                  }})
              }},
              {"bool": {
                  "must": [
                    ...Object.keys(selectedFilters).map(filterName => { return {
                      "terms": {[filterName + "_options"]: selectedFilters[filterName]},
                    }}),
                    {"match": {"type_id": "configurable"}}
                  ]
              }}
            ],
            ...() => (Object.keys(selectedFilters).length < 1) ? {"minimum_should_match": 1} : {},
          }
        }
      },
    },
    aggs: {
      agg_terms_price: {terms: {field: "price"}},
      agg_range_price: {range: {field: "price", ranges: [{from: 0, to: 0}, {from: 0, to: 500}, {from: 0, to: 1000}, {from: 0, to: 1500}, {from: 0, to: 2000}, {from: 0, to: 2500}, {from: 0, to: 3000}, {from: 0, to: 3500}, {from: 0, to: 4000}, {from: 500, to: 500}, {from: 500, to: 1000}, {from: 500, to: 1500}, {from: 500, to: 2000}, {from: 500, to: 2500}, {from: 500, to: 3000}, {from: 500, to: 3500}, {from: 500, to: 4000}, {from: 1000, to: 1000}, {from: 1000, to: 150}, {from: 1000, to: 200}, {from: 1000, to: 250}, {from: 1000, to: 300}, {from: 1000, to: 350}, {from: 1000, to: 400}, {from: 1500, to: 150}, {from: 1500, to: 200}, {from: 1500, to: 250}, {from: 1500, to: 300}, {from: 1500, to: 350}, {from: 1500, to: 400}, {from: 2000, to: 200}, {from: 2000, to: 250}, {from: 2000, to: 300}, {from: 2000, to: 350}, {from: 2000, to: 400}, {from: 2500, to: 250}, {from: 2500, to: 300}, {from: 2500, to: 350}, {from: 2500, to: 400}, {from: 3000, to: 300}, {from: 3000, to: 350}, {from: 3000, to: 400}, {from: 3500, to: 350}, {from: 3500, to: 400}, {from: 4000, to: 4000}],}},
      agg_terms_average_rating_filter: {terms: {field: "average_rating_filter", size: 10}},
      agg_terms_average_rating_filter_options: {terms: {field: "average_rating_filter_options", size: 10}},
      agg_terms_concerns: {terms: {field: "concerns", size: 10}},
      agg_terms_concerns_options: {terms: {field: "concerns_options", size: 10}},
      agg_terms_skin_type: {terms: {field: "skin_type", size: 10}},
      agg_terms_skin_type_options: {terms: {field: "skin_type_options", size: 10}},
      agg_terms_texture: {terms: {field: "texture", size: 10}},
      agg_terms_texture_options: {terms: {field: "texture_options", size: 10}}
    }
  }
  return await store.dispatch('product/list', {
    params: {
      source: JSON.stringify(esQuery),
      source_content_type: 'application/json',
    }
  });
}
</script>

<style lang="scss">
.p--catalogue {
  .top {
    h1 {
      font-size: 36px;
      text-align: center;
    }
  }
  .middle {
    width: 100%;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    // flex-wrap: wrap;
    .aside {
      flex-basis: 300px;
      flex-shrink: 0;
    }
    .main {
      $gutter: 16px;
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
      margin-right: -$gutter;
      justify-content: space-around;

      article {
        display: block;
        flex-basis: 200px;
        height: 300px;
        margin-right: $gutter;
        margin-bottom: $gutter;
      }
    }
  }
}

</style>
