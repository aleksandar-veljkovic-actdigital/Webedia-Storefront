<template>
  <div class="c--header--me">
    <h3>Email: {{me.email}}</h3>
  </div>
</template>

<script>
export default {
  computed: {
    me() {
      return this.$store.state.users;
    }
  },
  beforeMount() {
    this.$store.dispatch("users/me");
  }
};
</script>