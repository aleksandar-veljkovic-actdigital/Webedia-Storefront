<template>
  <ul class="c--categories">
    <li 
    v-for="category in categories" 
    :key="category.id">
      <n-link
      :to="'/' + category.url_path">
        {{ category.name }}
      </n-link>
      <categories
      v-if="$utils.optionalChaining(category, '.children_data[0]')"
      :categories="category.children_data"/>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'categories',
    props: [
      'categories'
    ],
  }
</script>

<style lang='scss'>
  .c--categories {
    list-style: disc;
    & li {
      margin-left: .5em;
    }
  }
</style>
