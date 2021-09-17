import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

// 以封装成插件的方式封装 完成后 在这里全局引入 toast.vue 组件
import toast from 'components/common/toast'

// 引入图片懒加载插件
import VueLazyLoad from 'vue-lazyload'


// 解决 移动端 300ms延迟
// 1. npm install fastclick --save 安装 fastclick
// 2. 引入 fastclick
import fastClick from 'fastclick'
fastClick.attach(document.body)

// 关闭 Vue 的生产提示
Vue.config.productionTip = false


Vue.prototype.$bus = new Vue()  // 把 Vue 实例 赋值给 $bus

// 以封装成插件的方式封装 完成后 在这里全局注册 toast
Vue.use(toast)

// 使用图片懒加载
Vue.use(VueLazyLoad,{
  error:require('assets/img/common/placeholder.png'),     // 图片加载失败后显示的图片
  loading:require('assets/img/common/placeholder.png')   // 图片加载时显示的图片
})



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
