<template>
  <div class="c--header--me">
    <h3>Email: {{me.email}}</h3>
    <form action=""  @submit.prevent="login">
      <input ref="username" placeholder="email" />
      <input ref="password" placeholder="password" />
      <button>login</button>
      <button @click.prevent="$store.dispatch('user/logout')">logout</button>
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

    async login () {
      const requestData = {
        username: this.$refs.username.value,
        password: this.$refs.password.value,
      }
      const loginResponse = await this.$store.dispatch('user/login', requestData)
      if (loginResponse.code == 200) {
        this.$store.dispatch('ui/message', {title: 'You Have Successfully Logged in'});
      }
      else if (typeof(loginResponse.result) === "string" ) {
        this.$store.dispatch('ui/message', {title: loginResponse.result, type: "error"});
      }
      
    }

  },

};

</script>

<style scoped>

</style>
