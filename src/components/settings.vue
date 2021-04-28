<template>
  <div class="absolute-top-right">
    <q-btn
      v-morph:btn:mygroup:300.resize="morphGroupModel"
      class="absolute-top-right q-ma-xs"
      flat
      round
      color="white"
      size="md"
      icon="ti-settings"
      @click="nextMorph"
    />

    <q-card
      v-morph:card1:mygroup:300.resize="morphGroupModel"
      class="absolute-top-right bg-pink-10 text-white q-ma-sm"
      style="width: 320px; border-bottom-left-radius: 2em"
    >
      <q-card-section>
        <div class="row q-gutter-none">
          <div class="col">
            <span class="text-h5">
              {{ $t('app.settings.title') }}
            </span>
          </div>
          <div class="col text-right">
            <q-btn round flat size="sm" icon="fas fa-times" @click="nextMorph" />
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <q-list>
          <q-item>
            <q-item-section avatar>
              <q-icon name="fas fa-adjust" />
            </q-item-section>

            <q-item-section>
              {{ $t('app.settings.darkTheme') }}
            </q-item-section>

            <!-- SWITCH -->
            <q-item-section side>
              <q-toggle
                v-model="dark"
                color="white"
              />
            </q-item-section>
          </q-item>

          <q-expansion-item
            dark
            v-model="expansionPanels.languageSelection"
            :caption="
                  $t('app.settings.lang.current') +
                    ': ' +
                    $t('app.settings.lang.map.' + this.$i18n.locale)
                "
            :label="$t('app.settings.lang.inline')"
            icon="ti-world"
          >
            <q-card class="bg-transparent">
              <q-card-section>
                <q-select
                  dark
                  color="white"
                  v-model="lang"
                  :options="langOptions"
                  dense
                  :label="$t('app.settings.lang.label')"
                  borderless
                  emit-value
                  map-options
                  options-dense
                />
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
const nextMorphStep = {
  btn: 'card1',
  card1: 'btn',
};

export default {
  data() {
    return {
      expansionPanels: {
        languageSelection: false,
      },
      lang: this.$i18n.locale,
      dark: undefined,
      morphGroupModel: 'btn',
    };
  },
  mounted() {
    this.dark = this.$q.dark.isActive;
  },

  watch: {
    lang(newVal, oldVal) {
      this.$appHelper.changeLanguage(newVal, this.$i18n);
    },
    dark(newVal, oldVal) {
      if (oldVal !== undefined) {
        this.$appHelper.toggleTheme(this.$q);
      }
    },
  },

  computed: {
    langOptions() {
      return [
        {value: 'en-us', label: this.$t('app.settings.lang.english')},
        {value: 'pl', label: this.$t('app.settings.lang.polish')},
      ];
    },
  },

  methods: {
    nextMorph() {
      this.morphGroupModel = nextMorphStep[this.morphGroupModel];
    },
  },
};
</script>
