<template><span 
  class="debug-data c--debug-data" 
  v-html="'<!--' + JSON.stringify(variable, null, 2) + '-->'"/></template>

<script>
  export default {
    name: "debug-data",
    props: [
      'variable'
    ],
    computed: {
      enabled () {
        return process.env.NODE_ENV === "development"
      },
    }
  }
</script>
