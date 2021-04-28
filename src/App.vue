<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>

export default {
  name: 'App',
  beforeCreate() {
    this.$i18n.locale = this.$appHelper.getLocale(this.$q);
    this.$appHelper.setThemeOnLoad(this.$q);
  },
};
</script>
