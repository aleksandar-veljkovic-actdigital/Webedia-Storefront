<template>
  <div class="c--header--index">
    <Nav />
    <Me />
    <Cart />
    <MultistoreSelector />
  </div>
</template>

<script>
  import Cart from './cart.vue'
  import Me from './me.vue'
  import MultistoreSelector from './multistore-selector.vue'
  import Nav from './nav.vue'
  export default {
    components: {
      Cart,
      Me,
      MultistoreSelector,
      Nav,
    },
  }
</script>
