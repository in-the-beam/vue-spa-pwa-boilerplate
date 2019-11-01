import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
//import VueI18n from 'vue-i18n'
//import Vuex from 'vuex'

//Vue.use(Vuex)
//Vue.use(VueI18n)

import store from '@/store'
import i18n from '@/plugins/i18n'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
//  render: h => h(App),
  ...App
})//.$mount('#app')
