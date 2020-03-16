import Vue from 'vue'
import store from '@/store'
import { i18n, loadMessages } from '@/plugins/i18n'
import VueI18n from 'vue-i18n'
import router from './router'
import App from './App.vue'
Vue.use(VueI18n)

;(async function () {
  await loadMessages(store.getters['lang/locale'])
})()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  ...App
})
