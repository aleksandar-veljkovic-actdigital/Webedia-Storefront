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
<pre>{{shippingAddress}}
</pre>
  </div>
</template>

<script>

import AddressForm from "./address-form.vue"
import PaymentDalenys from "./payment--dalenys"

export default {

  data () { return {
    shippingAddress: testAddress,
    paymentMethodAdditional: {},
  }},

  components: {
    AddressForm,
    PaymentDalenys,
  },

  methods: {

    prepareOrderData() {
      return {
        "clientIP": '127.0.0.1',
        "user_id": this.$store.state.user.me?.id + "",
        "cart_id": this.$store.state.cart.id,
        // "products": this.$store.state.cart.items,
        "addressInformation": {
          "shipping_method_code": "shipping_tracked_france",
          "shippingAddress": this.shippingAddress,
          "payment_method_code": "webedia_dalenys",
          "payment_method_additional": this.paymentMethodAdditional,
          "billingAddress": this.shippingAddress,
        },
        "store_code": "fr",
        "transmited": true
      }
    },

    async placeOrder() {
      const paymentDalenysComponent = this.$refs.paymentDalenysComponent
      this.paymentMethodAdditional = await paymentDalenysComponent.tokenizeDalenys();
      const orderData = this.prepareOrderData();
      await this.$store.dispatch('order/create', orderData) 
    },

  }

}




const testAddress = {
  "address_name": "tAdrName",
  "city": "tCity",
  "company": "tCo",
  "country_id": "FR",
  "firstname": "tName",
  "lastname": "tFamily",
  "postcode": "t11000",
  "second_street": "testFloor 69",
  "street": [
    "tStreet t69",
    ""
  ],
  "telephone": "+381001234567",
  "gender": "u",
  "email": "t@t.com",
  "region": "",
  "region_id": 0,
  "region_code": ""
}




</script>
