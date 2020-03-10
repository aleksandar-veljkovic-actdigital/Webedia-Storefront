<template>
  <div class="c--header--cart">
    <small>cardId: {{cart.tokenValue}}</small>
    <h3>Currency: {{cart.currency}}</h3>
    {{cart.items}}
    {{cart.totals}}
  </div>
</template>

<script>
export default {
  computed: {
    cart() {
      return this.$store.state.cart;
    }
  },
  beforeMount() {
    // this.$store.dispatch('cart/postCarts')
    this.$store.dispatch("cart/getCarts", { cartId: "" });
    // .then((resp)=>{
    //   console.log(resp)
    // })
  }
};
</script>