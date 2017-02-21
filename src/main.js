import Vue from 'vue'
import router from './router'
import App from './app'
import './human'
import './vuelidate'

/* eslint-disable no-new */
new Vue({
  el: 'app',
  router,
  render: h => h(App)
})
