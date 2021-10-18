import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

import GoogleAuth from '@/config/google_oAuth.js'
const gauthOption = {
  clientId: 'xxxxxxxxxxx.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}

//Vue.config.productionTip = false
new Vue({
  router,
  vuetify,
  gauthOption,
  GoogleAuth,
  render: h => h(App)
}).$mount('#app')

