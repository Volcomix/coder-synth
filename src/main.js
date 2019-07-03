import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.use(Vuetify, {
  theme: {
    primary: '#f26223',
    secondary: '#2a2e33',
  },
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
