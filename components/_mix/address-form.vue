<template>
  <div class="c--mix--address-form">

    <form
    @input="fromInputHandler"
    ref='form'>

      <label>{{$t('Address Name')}}:<input
      type='text'
      v-model.trim="valueLocal.address_name"></label>

      <label><input 
      type="radio"
      v-model="valueLocal.gender"
      value="mr">{{$t('Mr')}}</label>
      <label><input 
      type="radio"
      v-model="valueLocal.gender"
      value="mrs">{{$t('Mrs')}}</label>

      <label>{{$t('First Name')}}:<input
      type='text'
      v-model.trim="valueLocal.firstname"></label>

      <label>{{$t('Last Name')}}:<input
      type='text'
      v-model.trim="valueLocal.lastname"></label>

      <label>{{$t('Company')}}:<input
      type='text'
      v-model.trim="valueLocal.company"></label>

      <label>{{$t('Address')}}:<input
      type='text'
      v-model.trim="valueLocal.address"></label>

      <label>{{$t('Address Additional')}}:<input
      type='text'
      v-model.trim="valueLocal.second_street"></label>


      <label>{{$t('Post Code')}}:<input
      type='text'
      v-model.trim="valueLocal.postcode"></label>

      <label>{{$t('City')}}:<input
      type='text'
      v-model.trim="valueLocal.city"></label>

      <label>{{$t('Country')}}:<select
      v-model="valueLocal.country">
        <option
          v-for="country in [{code: 'fr', name: 'France'}, {code: 'gb', name: 'Great Brit'}]"
          :key="country.code"
          :value="country.code">
          {{ country.name }}
        </option>
      </select></label>

      <label>{{$t('Telephone')}}:<input
      type='text'
      v-model.trim="valueLocal.telephone"></label>

    </form>

    valueLocal {{valueLocal}}<hr>
    value {{value}}<hr>

  </div>
</template>

<script>

export default {

  props: [
    'value'
  ],

  data () {return {
    valueLocal: {...this.value},
  }}, 

  watch: {
    value: {
      deep: true,
      handler () {
        this.valueChangeHandler()
      },
    },

  },

  beforeMount () {
    this.valueChangeHandler()
  },

  methods: {

    valueChangeHandler () {
      console.log('xxxxxxxxx valueChangeHandler')
      this.valueLocal = {
        ...this.value,
        address: this.$utils.optionalChaining(this.value, '.address[0]') || '',
      }
    },

    fromInputHandler () {
      console.log('xxxxxxxxx fromInputHandler', this.$refs.form)
      let valueLocal = {...this.valueLocal}
      valueLocal.address = (this.valueLocal.address) ? [(this.valueLocal.address), ''] : (['', ''])
      this.$emit('input', valueLocal)
    }

  }

}

</script>