import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import vuetify from './vuetify'

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
}).$mount('#app')
