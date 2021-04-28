<template>
  <q-bar class="bg-dark q-electron-drag electron-only q-pr-none">
    <div class="text-grey-5">{{ $t('app.appName') }}</div>
    <q-space />
    <q-btn dense flat icon="minimize" class="full-height btn-action" @click="minimizeApp($q)" tabindex="-1" />
    <q-btn dense flat icon="crop_square" class="full-height btn-action" @click="maximizeApp($q)" tabindex="-1" />
    <q-btn dense flat icon="close" class="full-height btn-action btn-close" @click="closeApp($q)" tabindex="-1" />
  </q-bar>
</template>

<script>
export default {
  name: "BarElectron",
  methods: {
    minimizeApp() { this.$appHelper.minimize(this.$q) },
    maximizeApp() { this.$appHelper.maximize(this.$q) },
    closeApp() { this.$appHelper.close(this.$q) }
  }
}
</script>

<style scoped lang="scss">
.btn-close {
  &:hover {
    background-color: $negative;
  }
}
.btn-action {
  width: 32px;
  border-radius: 0;
}
</style>

