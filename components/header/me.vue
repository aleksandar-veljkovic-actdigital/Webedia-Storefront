<template>
  <div class="c--header--me">
    <h3>Email: {{me.email}}</h3>
    <form action=""  @submit.prevent="login">
      <input ref="username" placeholder="email" />
      <input ref="password" placeholder="password" />
      <button>login</button>
    </form>
  </div>
</template>

<script>

export default {

  computed: {

    me() {
      return this.$store.state.user.me || {};
    }

  },

  methods: {

    login () {
      const requestData = {
        username: this.$refs.username.value,
        password: this.$refs.password.value,
      }
      this.$store.dispatch('user/login', requestData)
    }

  },

};

</script>

<style scoped>

</style>
