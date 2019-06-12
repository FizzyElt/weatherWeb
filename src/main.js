import '@babel/polyfill'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { vsProgress } from 'vuesax'
import 'vuesax/dist/vuesax.css' //Vuesax styles
import VueJsonp from 'vue-jsonp'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faUserSecret, faAngleUp, faAngleDown} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

library.add(faUserSecret)
library.add(faAngleUp)
library.add(faAngleDown)
Vue.component('font-awesome-icon',FontAwesomeIcon)
Vue.config.productionTip = false
Vue.use(VueAxios,axios)
Vue.use(BootstrapVue)
Vue.use(vsProgress)
Vue.use(VueJsonp)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
