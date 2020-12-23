<template>
  <div class="c--mix--address-form">

    <form>

      <label>{{$t('Address Name')}}:<input
      type='text'
      v-model.trim="valueLocal.address_name"
      @input="fromInputHandler"></label>

      <label><input 
      type="radio"
      v-model="valueLocal.gender"
      value="m"
      @change="fromInputHandler">{{$t('Mr')}}</label>
      <label><input 
      type="radio"
      v-model="valueLocal.gender"
      value="f"
      @change="fromInputHandler">{{$t('Mrs')}}</label>

      <label>{{$t('First Name')}}:<input
      type='text'
      v-model.trim="valueLocal.firstname"
      @input="fromInputHandler"></label>

      <label>{{$t('Last Name')}}:<input
      type='text'
      v-model.trim="valueLocal.lastname"
      @input="fromInputHandler"></label>

      <label>{{$t('Company')}}:<input
      type='text'
      v-model.trim="valueLocal.company"
      @input="fromInputHandler"></label>

      <label>{{$t('Address')}}:<input
      type='text'
      v-model.trim="valueLocal.street"
      @input="fromInputHandler"></label>

      <label>{{$t('Address Additional')}}:<input
      type='text'
      v-model.trim="valueLocal.second_street"
      @input="fromInputHandler"></label>

      <label>{{$t('Post Code')}}:<input
      type='text'
      v-model.trim="valueLocal.postcode"
      @input="fromInputHandler"></label>

      <label>{{$t('City')}}:<input
      type='text'
      v-model.trim="valueLocal.city"
      @input="fromInputHandler"></label>

      <label>{{$t('Country')}}:<select
      v-model="valueLocal.country_id"
      @change="fromInputHandler">
        <option
          v-for="country in [{code: 'FR', name: 'France'}, {code: 'GB', name: 'Great Brit'}]"
          :key="country.code"
          :value="country.code">
          {{ country.name }}
        </option>
      </select></label>

      <label>{{$t('Telephone')}}:<input
      type='text'
      v-model.trim="valueLocal.telephone"
      @input="fromInputHandler"></label>

    </form>

  </div>
</template>

<script>

export default {

  props: [
    'value'
  ],

  data () {return {
    valueLocal: {},
  }}, 

  watch: {

    value: {
      deep: true,
      handler () {
        this.valueChangeHandler()
      },
    },

    '$store.state.user.me.email' () {
      this.valueChangeHandler()
    }

  },

  beforeMount () {
    this.valueChangeHandler()
  },

  methods: {

    valueChangeHandler () {
      this.valueLocal = {
        ...this.value,
        street: this.$utils.optionalChaining(this.value, '.street[0]') || '',
        gender: this.value.gender || "u",
        // save_details
        email: !("value.email" in this) ? this.$store.state.user.me.email : this.value.email,
        region: "",
        region_id: 0,
        region_code: "",
      }
    },

    fromInputHandler () {
      let valueLocal = {...this.valueLocal}
      valueLocal.street = (this.valueLocal.street) ? [(this.valueLocal.street), ''] : (['', ''])
      this.$emit('input', valueLocal)
    }

  }

}

</script>