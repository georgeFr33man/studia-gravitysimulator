<template>
  <q-page>
    <div class="row items-center">
      <div class="col-12 text-center">
        <h2 class="text-weight-light">{{ $t('app.appName') }}</h2>
      </div>
    </div>
    <div class="row full-height-item items-center">
      <div class="col-12 text-center">
        <transition
          appear
          enter-active-class="animated fadeInUp"
          leave-active-class="animated fadeOutUp"
        >
          <h4 class="text-weight-thin">{{ $t('app.presetSelectionText') }}</h4>
        </transition>
        <transition
          appear
          enter-active-class="animated fadeInUp"
          leave-active-class="animated fadeOutUp"
        >
          <Presets />
        </transition>
      </div>
    </div>
  </q-page>
</template>

<script>
import {Plotly} from 'vue-plotly';
import ChartForm from 'components/forms/chart-form/chartForm';
import Presets from 'components/forms/presets/Presets';
import {toggleTheme} from '../helpers/AppHelper';

export default {
  name: 'PageIndex',
  components: {
    Presets,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
.full-height-item {
  height: 50vh !important;
}
</style>
