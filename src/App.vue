
<template>
  <v-app>

    <v-main>
      <Nav/>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
//import ConfirmDialog from './components/ConfirmDialog.vue';
import Nav from "./components/Nav"
export default {
  name: 'App',

  components: {
    //ConfirmDialog,
    Nav
  },

  data: () => ({
    //
  }),
};
</script>
