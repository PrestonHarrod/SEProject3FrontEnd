<template>
   <v-card
    :loading="loading"
    class="mx-auto my-12"
    max-width="374"
  >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      height="250"
      src="../assets/logo.png"
    ></v-img>

    <v-card-title>Welcome! Click to Login</v-card-title>
    <SocialLogin/>

  </v-card>
</template>


<script>
import SocialLogin from '@/components/SocialLogin'
export default {
  name: 'login',
  components: {
    SocialLogin
  }
}
</script>