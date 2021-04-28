<template>
  <div class="row q-mb-md">
    <!--    First object    -->
    <div class="col-12 col-sm-6 q-px-lg q-m-md">
      <span class="text-h6">{{ $t('chart.form.first') }}</span>
      <!--    Mass    -->
      <q-input type="number" :label="$t('chart.form.mass')" v-model="form['object1']['mass']" :min="1" stack-label>
        <template v-slot:control>
          <div class="self-center full-width no-outline" tabindex="1">0</div>
        </template>
      </q-input>
      <!--    Speed    -->
      <q-input type="number" :label="$t('chart.form.speed')" v-model="form.object1.speed" :min="1" stack-label>
        <template v-slot:control>
          <div class="self-center full-width no-outline" tabindex="1">0</div>
        </template>
      </q-input>
    </div>

    <!--    Second object    -->
    <div class="col-12 col-sm-6 q-px-lg q-m-md">
      <span class="text-h6">{{ $t('chart.form.second') }}</span>
      <!--    Mass    -->
      <q-input type="number" :label="$t('chart.form.mass')" v-model="form.object2.mass" :min="1" stack-label>
        <template v-slot:control>
          <div class="self-center full-width no-outline" tabindex="1">0</div>
        </template>
      </q-input>
      <!--    Speed    -->
      <q-input type="number" :label="$t('chart.form.speed')" v-model="form.object2.speed" :min="1" stack-label>
        <template v-slot:control>
          <div class="self-center full-width no-outline" tabindex="1">0</div>
        </template>
      </q-input>
    </div>

    <!--    Initial states    -->
    <div class="col-12 col-sm-6 q-px-lg q-mt-md">
      <span class="text-h6">{{ $t('chart.form.initial') }}</span>
      <!--    Initial radius    -->
      <q-input type="number" :label="$t('chart.form.placing')" v-model="form.initials.radius" :min="1" stack-label>
        <template v-slot:control>
          <div class="self-center full-width no-outline" tabindex="1">0</div>
        </template>
      </q-input>
    </div>

    <!--    Simulate    -->
    <div class="col-12 col-sm-6 q-px-lg q-mt-md">
      <q-btn
          v-if="!simulating"
          color="negative"
          class="full-height full-width"
          :label="$t('chart.form.simulate')"
          @click="simulate()"
      />
      <q-btn-group class="full-height full-width" v-if="simulating">
        <q-btn
          class="full-width"
          color="negative"
          :label="$t('chart.form.stopSimulate')"
          @click="stopSimulate()"
        />
        <q-btn
          class="full-width"
          color="secondary"
          :label="pause ? $t('chart.form.resumeSimulate') :  $t('chart.form.pauseSimulate')"
          @click="togglePause()"
        />
      </q-btn-group>
    </div>
  </div>
</template>

<script>

export default {
  name: 'chartForm',
  data() {
    return {
      form: {
        object1: {
          mass: 0,
          speed: 0,
          radius: 0,
        },
        object2: {
          mass: 0,
          speed: 0,
          radius: 0,
        },
        initials: {
          radius: 1,
        },
      },
      simulating: false,
      pause: false,
    };
  },
  methods: {
    loadPreset(preset) {
      if (preset !== undefined) {
        this.form = preset;
      }
    },
    simulate() {
      this.simulating = true;
      this.$emit("simulate", {variables: this.form});
    },
    stopSimulate() {
      this.simulating = false;
      this.$emit("stop", {variables: this.simulating});
    },
    togglePause() {
      this.pause = !this.pause;
      this.$emit("togglePause", {pause: this.pause});
    },
  },
};
</script>
