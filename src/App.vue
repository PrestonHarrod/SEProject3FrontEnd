
<template>
  <v-app>

    <v-main>
      <router-view/>
      <ConfirmDialog/>
    </v-main>
  </v-app>
</template>

<script>
import ConfirmDialog from './components/ConfirmDialog.vue';

export default {
  name: 'App',

  components: {
    ConfirmDialog
  },

  data: () => ({
    //
  }),
};
</script>
