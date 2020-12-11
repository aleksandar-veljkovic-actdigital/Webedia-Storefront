<template>
  <div class="p--home p--index">
    <n-link :to="localePath('/shop')">shop</n-link>
    <n-link :to="localePath('/test')">test</n-link>
  </div>
</template>

<script>
  export default {
    name: 'home'
  }
</script>
