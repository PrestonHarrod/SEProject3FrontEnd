<template>
<v-container fluid>
  <v-layout>
      <v-flex>
        <div>
          <img alt="Vue logo" src="./assets/logo.png" 
            contain
            height="300"
            width="500">
          <router-view />
          <ConfirmDialog />
        </div>
      </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import ConfirmDialog from '@/components/ConfirmDialog.vue'
export default {
  name: 'App',
  components: {
    ConfirmDialog
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}


</style>
