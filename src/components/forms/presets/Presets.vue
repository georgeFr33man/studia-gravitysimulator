<template>
  <div class="row justify-center">
    <div class="col-lg-2 col-md-12 text-center q-ma-sm">
      <q-btn
        size="lg"
        outline
        class="btn-sized"
        color="pink-9"
        :label="$t('chart.presets.sunAndEarth')"
        :to="{ name: 'simulator', params: {simulationType: planetAndSun} }"
      />
    </div>
    <div class="col-lg-2 col-md-12  text-center q-ma-sm">
      <q-btn
        size="lg"
        class="btn-sized"
        outline
        color="pink-9"
        :label="$t('chart.presets.twoStars')"
        :to="{ name: 'simulator', params: {simulationType: twoStars} }"
      />
    </div>
  </div>
</template>

<script>
import Presets from 'src/models/Presets';
console.log(Presets);
export default {
  name: 'Presets',
  data() {
    return {
      planetAndSun: Presets.planetAndSun.name,
      twoStars: Presets.twoStars.name,
    }
  }
}
</script>

<style scoped lang="scss">
.btn-sized {
  min-width: 200px;
  max-width: 200px;
}
</style>
