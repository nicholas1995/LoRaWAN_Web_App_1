// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import store from './store/store'

Vue.config.productionTip = false

Vue.use(Vuetify, {
  theme: {
    //primary: "#99D3DF",
    primary: "#99D3DF",
    secondary: "#88BBD6",
    app_background: "FFFFFF",
    form_background: "EEEEEE",
    button: "#88BBD6",
    accent: "#CDCDCD",
    other: "E9E9E9",
    error: "#FF5252",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FFC107"
  }
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
