<template>
  <div class="container">
    <div 
    v-for="(item, index) in items"
    :key="`sh-list-item-${index}`">
      <h3>{{item.code}}</h3>
      <h3>{{item.slug}}</h3>
      <h2>{{item.name}}</h2>
      <small>{{item}}</small>
      <hr>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },
  async asyncData ({store}) {
    let data = {};
    data.items = await store.dispatch('list/fetch');
    return data;
  },
}
</script>

<style>

</style>
