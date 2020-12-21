<template>
  <div class="c--checkout">

    <h1>Checkout</h1>

    <AddressForm 
    v-model="shippingAddress"/>

  </div>
</template>

<script>

import AddressForm from "./address-form.vue"

export default {

  data () { return {
    shippingAddress: {},
  }},

  components: {
    AddressForm,
  }

}

</script>