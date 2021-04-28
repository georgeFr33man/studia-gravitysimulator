<template>
  <q-layout view="hHh lpR lFr" v-scroll="toggleToolbar">
    <q-header class="bg-transparent">
      <!-- ELECTRON BAR -->
      <BarElectron />
      <q-toolbar v-if="toolbar" class="bg-pink-9">
        <q-btn
          v-if="$route.fullPath !== '/'" to="/"
          size="md" flat
          round
          color="white"
          icon="ti-arrow-left"
        />
        <settings />
      </q-toolbar>
    </q-header>
    <!-- ROUTER -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import BarElectron from 'components/bars/Bar.electron';
import Settings from 'components/settings';

export default {
  name: 'MainLayout',
  components: {
    Settings,
    BarElectron,
  },
  data() {
    return {
      toolbar: true,
    };
  },
  methods: {
    toggleToolbar(scroll) {
      this.toolbar = scroll < 80;
    },
  },
};
</script>
