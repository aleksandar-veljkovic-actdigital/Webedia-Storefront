<template>
  <div class="c--header--index">
    <Me />
    <Cart />
    <MultistoreSelector />
  </div>
</template>

<script>
  import Cart from './cart.vue'
  import Me from './me.vue'
  import MultistoreSelector from './multistore-selector.vue'
  export default {
    components: {
      Cart,
      Me,
      MultistoreSelector,
    },
  }
</script>
