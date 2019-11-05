import axios from 'axios'
import store from '@/store'
import { i18n } from '@/plugins/i18n'
// import router from '@/router'

// Request interceptor
axios.interceptors.request.use(request => {
  const token = store.getters['auth/token']
  if (token) {
    request.headers.common.Authorization = `Bearer ${token}`
  }
  const locale = store.getters['lang/locale']
  if (locale) {
    request.headers.common['Accept-Language'] = locale
  }
  return request
})

// Response interceptor
axios.interceptors.response.use(response => response, error => {
  const { status } = error.response
  if (status >= 500) {
    console.error(i18n.t('error_alert_title'), i18n.t('error_alert_text'))
  }
  if (status === 401 && store.getters['auth/check']) {
    console.warning(i18n.t('token_expired_alert_title'), i18n.t('token_expired_alert_text'))
    // store.commit('auth/LOGOUT')
    // router.push({ name: 'signin' })
  }
  return Promise.reject(error)
})

if (window.axios === undefined) {
  window.axios = axios
}
export default axios
