<template><div>
  <form action=""  @submit.prevent="submitted">
    <input ref="email" placeholder="email" />
    <input ref="password" placeholder="password" />
    <button>login</button>
  </form>

</div></template>

<script>
import Logo from '~/components/Logo.vue'

export default {

  methods: {
    submitted () {
      const loginPayload = {
        email: this.$refs.email.value,
        password: this.$refs.password.value,
      }
      this.$store.dispatch('users/login', loginPayload)
    }
  },

}
</script>

<style>

</style>
