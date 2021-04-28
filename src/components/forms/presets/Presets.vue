<template>
  <div class="row justify-center">
    <div class="col-lg-2 col-md-12 text-center q-ma-sm">
        <q-btn
          size="lg"
          outline
          class="btn-sized"
          color="pink-9"
          :label="$t('chart.presets.sunAndEarth')"
          :to="{ name: 'simulator', params: {type: planetAndSun} }"
        />
    </div>
    <div class="col-lg-2 col-md-12  text-center q-ma-sm">
      <q-btn
        size="lg"
        class="btn-sized"
        outline
        color="pink-9"
        :label="$t('chart.presets.twoStars')"
        :to="{ name: 'simulator', params: {type: twoStars} }"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Presets",
  data() {
    return {
      planetAndSun: {
        name: "planetAndSun",
        object1: {
          mass: 132600000000,
          speed: 0,
          radius: 6378.14
        },
        object2: {
          mass: 398133,
          speed: 29.291,
          radius: 695700
        },
        initials: {
          radius: 152100000,
        },
      },
      twoStars: {
        name: "twoStar",
        object1: {
          mass: 132600000000,
          speed: 23.94,
          radius: 695000
        },
        object2: {
          mass: 132600000000,
          speed: -23.94,
          radius: 695000
        },
        initials: {
          radius: 152100000,
        },
      }
    }
  },
};
</script>

<style scoped lang="scss">
.btn-sized {
  min-width: 200px;
  max-width: 200px;
}
</style>
