import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false


Vue.prototype.$bus = new Vue()  // 把 Vue 实例 赋值给 $bus




/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
