import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './components/register'
import vuetify from './plugins/vuetify';
import 'normalize.css/normalize.css'
import './css/default.css'
import i18n from './locale/localeConfig'
import moment from "moment";
import * as filters from './filters'
import VueClipboard from 'vue-clipboard2'

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.config.productionTip = false
Vue.prototype.$moment = moment;
Vue.use(VueClipboard)
new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
