<template>
  <q-page class="q-px-sm">
    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <div class="row">
        <div class="col-12">
          <Plotly
            :key="plotKey"
            :data="plotData"
            :layout="plotLayout"
            :display-mode-bar="true"
            :scrollZoom="true"
          ></Plotly>
        </div>

        <div class="col-12 q-px-lg">
          <q-slider
            v-model="simulationSpeed"
            :min="10"
            :max="100"
            :label-value="$t('chart.form.simulationSpeed') + `: ${simulationSpeed}`"
            label-always
            color="secondary"
          />
          <q-slider
            class="q-mt-md"
            v-model="historyLength"
            :min="10"
            :max="100"
            :label-value="$t('chart.form.historyLength') + `: ${historyLength}`"
            label-always
            color="warning"
          />
        </div>
        <div class="col-lg-12 col-12">
          <ChartForm
            ref="chartForm"
            @simulate="simulate"
            @stop="simulating=false"
            @togglePause="togglePause"
          />
        </div>
      </div>
    </transition>
  </q-page>
</template>

<script>
import {Plotly} from 'vue-plotly';
import ChartForm from 'components/forms/chart-form/chartForm';

export default {
  name: 'PageSimulation',
  components: {
    ChartForm,
    Plotly,
  },
  created() {
    this.plotLayout = this.$pth.mergeThemes(this.plotLayout, this.$pth.getTheme(this.$q.dark.isActive));
    this.preset = this.$route.params.type;
  },
  data() {
    return {
      plotKey: 0,
      simulating: false,
      pause: false,
      plotData: [],
      plotLayout: {
        title: {
          text: this.$t('chart.name'),
        },
      },
      preset: undefined,
      simulationSpeed: 10,
      historyLength: 10,
    };
  },
  watch: {
    dark(newVal, oldVal) {
      this.performThemeToggle();
    },
    lang(newVal, oldVal) {
      this.plotLayout.title.text = this.$t('chart.name');
      this.updatePlot();
    },
    preset(newVal, oldVal) {
      if (oldVal === undefined && newVal !== undefined) {
        this.$refs['chartForm'].loadPreset(newVal);
      }
    },
  },
  computed: {
    dark() {
      return this.$q.dark.isActive;
    },
    lang() {
      return this.$i18n.locale;
    },
    chartName() {
      return this.$t('chart.name');
    }
  },
  methods: {
    simulate(obj) {
      let gravitySystem = new this.$gravityHelper.GravitySystem(obj.variables, this);
      this.simulating = true;
      this.pause = false;
      this.runSimulation(gravitySystem);
    },
    /***
     * @param gravitySystem {GravitySystem}
     */
    runSimulation(gravitySystem) {
      if (this.simulating) {
        if (this.pause === false) {
          this.plotData = gravitySystem.next(this.simulationSpeed, this.historyLength);
        }
        // wait and repeat
        setTimeout(_ => {
          this.runSimulation(gravitySystem);
        }, 1);
      }
    },
    performThemeToggle() {
      this.plotLayout = this.$pth.mergeThemes(this.plotLayout, this.$pth.getTheme(this.dark));
      this.updatePlot();
    },
    updatePlot() {
      if (this.plotKey >= 1000) {
        this.plotKey = 0;
      } else {
        this.plotKey++;
      }
    },
    togglePause(e) {
      this.pause = e.pause;
    },
  },
};
</script>

<style>
#symbol {
  display: none;
}
body {
  overflow-x: hidden;
}
</style>
