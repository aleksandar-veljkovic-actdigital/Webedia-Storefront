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
        <pre style="width: 300px; height: 300px; overflow:scroll">{{$store.state.category.tree}}</pre>
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
import Logo from '~/components/Logo.vue'
import ProductItem from '~/components/product/product-item.vue'
import ProductFilters from '~/components/product/filters.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    Logo,
    ProductItem,
    ProductFilters
  },
  async asyncData ({store}) {
    let data = {};
    const {payload: products} = await store.dispatch('product/list');
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
