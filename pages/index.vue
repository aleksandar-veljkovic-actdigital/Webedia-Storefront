<template>
  <div class="p-catalogue">
    <div class="b-hero" style="background: url(https://via.placeholder.com/150);">
      <h1 class="b-hero--title">Visage</h1>
    </div>
    <div class="products--wrapper wrapper">
      <product-filters />
      <div class="products--list">
        <product-item 
          v-for="(item, index) in items"
          :key="`sh-list-item-${index}`"
          :product="item"
        >
        </product-item>
      </div>
    </div>    
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import ProductItem from '~/components/product/product-item.vue'
import ProductFilters from '~/components/product/filters.vue'

export default {
  components: {
    Logo,
    ProductItem,
    ProductFilters
  },
  async asyncData ({store}) {
    let data = {};
    data.items = await store.dispatch('list/fetch');
    return data;
  }
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
</style>
