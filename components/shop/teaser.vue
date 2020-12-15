<template>
  <div class="c--product-item">
    <DebugData :variable="product"/>
    <h2 class="title">{{product.name}}</h2>
  </div>
</template>

<script>
import DebugData from '~/components/debug-data.vue'

export default {
  props: ['product'],
  components: {
    DebugData
  },
  methods: {
      cartAdd (product) {
        this.$store.dispatch('cart/addItem', product);
      },
      getPrice(productPrice) {
      return Object.values(productPrice)[0].price.current;
      }
  }
}
</script>

<style scoped lang="scss">
.c--product-item {
  width: 100%;
  height: 100%;
  outline: 1px solid #eee;
  padding: 16px;
}
</style>
