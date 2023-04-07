import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './config/vuetify'
import AxiosConfig from "@/config/AxiosConfig"
import LangModule from "@/store/LangModule"
import { getModule } from "vuex-module-decorators"
import VueDebounce from "vue-debounce"
import "@/config/custom-styles.css"
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false
let vue: Vue
AxiosConfig.init(vue!)
getModule(LangModule).loadLanguage()
Vue.use(VueDebounce)

vue = new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')