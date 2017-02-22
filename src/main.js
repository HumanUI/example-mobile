/* !!Load router into the last */
import Vue from 'vue'
import './human'
import './vuelidate'
import App from './app'
import router from './router'

/* eslint-disable no-new */
new Vue({
  el: 'app',
  router,
  render: h => h(App)
})
