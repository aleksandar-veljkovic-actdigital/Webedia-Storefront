<template>
  <div class="c--checkout">

    <h1>Checkout</h1>

    <AddressForm 
    v-model="shippingAddress"/>

    <PaymentDalenys />

  </div>
</template>

<script>

import AddressForm from "./address-form.vue"
import PaymentDalenys from "./payment--dalenys"

export default {

  data () { return {
    shippingAddress: {},
  }},

  components: {
    AddressForm,
    PaymentDalenys,
  }

}

</script>