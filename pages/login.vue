<template><div>
  <form action=""  @submit.prevent="submitted">
    <input ref="email" placeholder="email" />
    <input ref="pass" placeholder="password" />
    <button>login</button>
  </form>

</div></template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  methods: {
    submitted () {
      const email = this.$refs.email.value;
      const pass = this.$refs.pass.value;
      
      console.log(email, pass);
    }
  },
}
</script>

<style>

</style>
