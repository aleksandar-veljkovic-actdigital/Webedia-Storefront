<template>
  <div class="c--header--nav">
    
    <n-link :to="localePath('/shop')">shop</n-link>
    <n-link :to="localePath('/test')">test</n-link>

  </div>
</template>

<script>

import {component} from '~/store/cart.js'
export default {

};
</script>

<style scoped lang="scss">
</style>
