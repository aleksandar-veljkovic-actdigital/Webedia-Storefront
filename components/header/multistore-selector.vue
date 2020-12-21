<template>
  <div class="c--header--multistore-selector">
    <a
    v-for="(locale, ix) in $i18n.locales"
    :key="'a-'+ix"
    :class="{active: locale.code === $i18n.locale}"
    :href="localePath('/', locale.code)">
      {{locale.code}}-hp |
    </a>
    <n-link 
    v-for="(locale, ix) in $i18n.locales"
    :key="'n-link-'+ix"
    :class="{active: locale.code === $i18n.locale}"
    :to="switchLocalePath(locale.code)">
      | {{locale.code}}
    </n-link>
  </div>
</template>

<script>
export default {
  computed: {
    codes() {
      return this.$i18n.locales.map(locale => locale.code)
    }
  },
};
</script>

<style lang="scss">

.c--header--multistore-selector {
  .active {
    outline: 1px solid gray;
  }
}

</style>
