<template>
  <div class="c--header--cart">
    <!-- <span class="c--header--cart--number" v-if="isItems">{{ quantity }}</span> -->
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24" viewBox="0 0 24 24">
      <defs>
          <path id="prefix__a" d="M0 0L21.576 0 21.576 24 0 24z"/>
      </defs>
      <g fill="none" fill-rule="evenodd" transform="translate(1)">
          <mask id="prefix__b" fill="#fff">
              <use xlink:href="#prefix__a"/>
          </mask>
          <path fill="#000" d="M2.07 5.793h3.338v1.862h.828V5.793h8.69v1.862h.827V5.793h3.752l1.185 17.38H.886L2.07 5.792zM6.237 4.76c0-2.168 1.95-3.931 4.345-3.931 2.395 0 4.344 1.763 4.344 3.93v.208h-8.69v-.207zm14.041.207h-4.524v-.207c0-2.624-2.32-4.759-5.172-4.759S5.408 2.135 5.408 4.759v.207h-4.11L0 24h21.576L20.277 4.966z" mask="url(#prefix__b)"/>
      </g>
    </svg>
    <div v-for="cartItem in cartItems" :key="cartItem.item_id">
      <h4>{{cartItem.name}}</h4>
    </div>
  </div>
</template>

<script>

export default {
  computed: {
    cart () {
      return this.$store.state.cart;
    },
    cartItems () {
      return this.$store.state.cart.items || [];
    }
  }
};
</script>

<style scoped lang="scss">
</style>