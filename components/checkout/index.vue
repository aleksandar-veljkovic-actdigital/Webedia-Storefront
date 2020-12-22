<template>
  <div class="c--checkout">

    <h1>Checkout</h1>

    <AddressForm 
    v-model="shippingAddress"/>

    <PaymentDalenys
    ref="paymentDalenysComponent" />

    <button 
    @click="placeOrder">
      {{$t('place order')}}
    </button>

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
  },

  methods: {
    async placeOrder() {
      const paymentDalenysComponent = this.$refs.paymentDalenysComponent
      const dalenysTokens = await paymentDalenysComponent.tokenizeDalenys();
      console.log('xxxxxxxxx dalenysTokens', dalenysTokens)
    },
  }

}

</script>
