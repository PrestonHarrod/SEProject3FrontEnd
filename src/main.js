import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
//import store from './store/store'

import GoogleAuth from '@/config/google_oAuth.js'

const gauthOption = {
  clientId: 'xxxxxxxxxxx.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}
Vue.use(GoogleAuth, gauthOption)
Vue.config.productionTip = false

Vue.config.productionTip = false
new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

