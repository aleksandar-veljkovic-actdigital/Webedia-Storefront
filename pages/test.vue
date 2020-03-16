<i18n>{
en: 
  'Hello world!': 'Hello world!'
fr:
  'Hello world!': 'Bonjour le monde!'
}</i18n>

<template><div>

  <h2>{{ $t('Hello world!') }}</h2>

  <n-link :to='localePath("/")'>home</n-link>
</div></template>
