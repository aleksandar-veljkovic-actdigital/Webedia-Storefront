<template>
  <div class="c--header--nav">
    
    <n-link :to="localePath('/')">home</n-link>
    <n-link :to="localePath('/shop')">shop</n-link>
    <n-link :to="localePath('/test')">test</n-link>
    <n-link :to="localePath('/checkout')">checkout</n-link>

  </div>
</template>

<script>

export default {

};

</script>

<style scoped lang="scss">
</style>
