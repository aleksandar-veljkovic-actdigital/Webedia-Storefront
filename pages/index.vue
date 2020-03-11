<template>
  <div class="products--wrapper wrapper">
    <div class="filters">
      
    </div>
    <div class="products--list">
      <product-item 
        v-for="(item, index) in items"
        :key="`sh-list-item-${index}`"
        :product="item"
      >
      </product-item>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import ProductItem from '~/components/product/product-item.vue'

export default {
  components: {
    Logo,
    ProductItem
  },
  async asyncData ({store}) {
    let data = {};
    data.items = await store.dispatch('list/fetch');
    return data;
  }
}
</script>

<style scoped lang="scss">
  .filters{
    @include breakpoint(desktop){
      width: 150px; 
    }
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
      width: calc(100% - 150px);
    }
  }
</style>
