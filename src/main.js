import Vue from 'vue'
import App from './App'

import store from './store'
import router from './router/index'

import axios from 'axios'
import VueAxios from 'vue-axios'

import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"

Vue.config.productionTip = false

Vue.use(VueAxios, axios)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
