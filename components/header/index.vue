<template><div class="c--header--index">
  <me-c />
  <cart-c />
</div></template>

<script>
  import cartC from './cart.vue'
  import meC from './me.vue'
  export default {
    components: {
      cartC,
      meC,
    },
  }
</script>