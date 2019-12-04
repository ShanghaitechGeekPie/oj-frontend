// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import ElementUI from 'element-ui'
import Vuex from 'vuex'
import '../../theme/index.css'
import 'element-ui/lib/theme-chalk/base.css'
import axios from 'axios'
import store from './store'
import VueCookies from 'vue-cookies'
import VueClipboard from 'vue-clipboard2'

Vue.use(VueCookies)
Vue.use(VueClipboard)
Vue.config.productionTip = false
Vue.use(ElementUI)
if (window.location.hostname === 'localhost') {
  require('./mock.js')
  document.title += ' [DEBUGGING]'
}
Vue.use(Vuex)
Vue.prototype.axios = axios
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  return Promise.reject(error)
})
/* eslint-disable no-new */

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
