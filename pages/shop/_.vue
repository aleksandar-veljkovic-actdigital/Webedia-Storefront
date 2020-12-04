<template>
  <div class="p-catalogue">

    <div class="b-hero" style="background: url(https://via.placeholder.com/150);">
      <h1 class="b-hero--title">Visage</h1>
    </div>

    <!-- <div class="filters--trigger">
      <button 
        class="filters--trigger--item"
        @click="openFilters"
      >filtrer par</button>
      <button class="filters--trigger--item">Trier par</button>
    </div> -->

    <div class="products--wrapper wrapper">
      <div>
        <categories :categories="$store.state.category.tree"/>
        <product-filters />
      </div>
      <div class="products--list">
        <product-item 
          v-for="(product, index) in products"
          :key="`sh-list-item-${index}`"
          :product="product">
        </product-item>
      </div>
    </div> 

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Logo from '~/components/Logo.vue'
import ProductItem from '~/components/product/product-item.vue'
import ProductFilters from '~/components/product/filters.vue'
import Categories from '~/components/categories.vue'

export default {
  name: 'shop',
  components: {
    Logo,
    ProductItem,
    ProductFilters,
    Categories,
  },

  async asyncData ({store, route}) {
    let data = {};
    const path = route.path.replace(/^\//, "").replace(/\/$/, "")
    const slug = [...path.split("/")]?.pop();
    const id = parseInt(slug) || 6 //@toDo <---- root category 
    // console.log('xxxxxxxxx path...', {path, slug, id})
    const esQuery = {
      size: 12,
      sort: [{updated_at: {order: "desc"}}],
      "query": {
        "bool": {
          "filter": {
            "bool": {
              "must": [
                {"terms": {visibility: [2, 3, 4]}},
                {"terms": {status: [0,1]}},
                {terms: {category_ids: [id]}},
                // {match: {"category.path": ...}},
                // {
                //   "query_string": {
                //     "default_field": "category.path",
                //     "query": '"shop/corps/bain&douche"'
                //   }
                // }
              ]
            }
          }
        },
      },
      aggs: {
        agg_terms_price: {terms: {field: "price"}},
        agg_range_price: {
          range: {
            field: "price",
            ranges: [
              {from: 0, to: 0},
              {from: 0, to: 500},
              {from: 0, to: 1000},
              {from: 0, to: 1500},
              {from: 0, to: 2000},
              {from: 0, to: 2500},
              {from: 0, to: 3000},
              {from: 0, to: 3500},
              {from: 0, to: 4000},
              {from: 500, to: 500},
              {from: 500, to: 1000},
              {from: 500, to: 1500},
              {from: 500, to: 2000},
              {from: 500, to: 2500},
              {from: 500, to: 3000},
              {from: 500, to: 3500},
              {from: 500, to: 4000},
              {from: 1000, to: 1000},
              {from: 1000, to: 150},
              {from: 1000, to: 200},
              {from: 1000, to: 250},
              {from: 1000, to: 300},
              {from: 1000, to: 350},
              {from: 1000, to: 400},
              {from: 1500, to: 150},
              {from: 1500, to: 200},
              {from: 1500, to: 250},
              {from: 1500, to: 300},
              {from: 1500, to: 350},
              {from: 1500, to: 400},
              {from: 2000, to: 200},
              {from: 2000, to: 250},
              {from: 2000, to: 300},
              {from: 2000, to: 350},
              {from: 2000, to: 400},
              {from: 2500, to: 250},
              {from: 2500, to: 300},
              {from: 2500, to: 350},
              {from: 2500, to: 400},
              {from: 3000, to: 300},
              {from: 3000, to: 350},
              {from: 3000, to: 400},
              {from: 3500, to: 350},
              {from: 3500, to: 400},
              {from: 4000, to: 4000
              }
            ]
          }
        },
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

    const {payload: products} = await store.dispatch('product/list', {
      params: {
        source: JSON.stringify(esQuery),
        source_content_type: 'application/json',
      }
    });
    data.products = products;
    return data;
  },

  methods: {
    openFilters(){
      this.$store.dispatch('filters/triggerFilters');
    }
  },
  
}
</script>

<style scoped lang="scss">
  .b-hero{
    height: 300px;
    background-size: cover !important;
    position: relative;
    margin-bottom: 18px;
    @include breakpoint(desktop){
      height: 400px;
    }
  }
  .b-hero--title{
    position: absolute;
    text-align: center;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    right: 0;
    color: $color-white;
    font-size: 40px;
    font-family: $ff-sec;
  }
  .products--wrapper{
    @include breakpoint(desktop){
      display: flex;
      flex-wrap: wrap;
    }
  }
  .products--list{
    @include breakpoint(desktop){
      display: flex;
      flex-wrap: wrap;
      width: calc(100% - 328px);
      padding-left: 55px;
    }
  }
  .filters--trigger{
    display: flex;
    justify-content: space-between;
    padding: 0 16px;
    margin-bottom: 20px;
    @include breakpoint(desktop){
      display: none;
    }
  }
  .filters--trigger--item{
    text-transform: uppercase;
    font-size: 12px;
    border: 1px solid $color-alto;
    background: transparent;
    width: 48%;
    text-align: left;
  }
</style>
