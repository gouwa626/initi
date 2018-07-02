import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import './common/stylus/reset.styl'
import './common/stylus/border.css'
import './assets/fonts/iconfont.css'

Vue.config.productionTip = false
Vue.prototype.axios = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
