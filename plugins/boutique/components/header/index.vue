<template>
  <div class="c--header--index">
    <Nav />
    <Me />
    <Cart />
    <MultistoreSelector />
  </div>
</template>

<script>

  import Cart from '@components/header/cart.vue'
  import Me from '@components/header/me.vue'
  import MultistoreSelector from '@components/header/multistore-selector.vue'
  import Nav from '@components/header/nav.vue'
  export default {
    components: {
      Cart,
      Me,
      MultistoreSelector,
      Nav,
    },
  }
</script>
