import Vue from 'vue'
import Router from 'vue-router'



const Home = () => import('views/home/Home')
const Cart = () => import('views/cart/Cart')
const Category = () => import('views/category/Category')
const Profile = () => import('views/profile/Profile')
const Detail = () => import('views/detail/Detail')




Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      redirect: '/home'
    },
    {
      path:'/home',
      component:Home
    },
    {
      path:'/cart',
      component:Cart
    },
    {
      path:'/category',
      component:Category
    },
    {
      path:'/profile',
      component:Profile
    },
    
    // 进入详情页需要传参数，用动态路由的方式
    {
      path:'/detail/:id',
      component:Detail
    },
  ],

  mode:'history',

})


/*
报错：“导航重复：避免到当前位置的冗余导航。”
报错原因：vue-router发现你replace了相同的路由。

解决思路：在router文件夹的index.js下重写vue-router的replace方法，令之不报该种类型的错误。如果用的是push方法就重写push方法
*/
// 1.首先保存好原来的replace方法：
const routerPush = Router.prototype.replace

// 2.重写 replace方法，重写的 replace 方法不仅需要调用原来的 replace 方法，还需要在此基础上增加一个catch捕获异常，如果发现捕获的异常是NavigationDuplicated，那就忽略该异常，其它的异常正常显示。
Router.prototype.replace = function (location, onComplete, onAbort) {
   return routerPush.call(this, location, onComplete, onAbort).catch(err => {
     if(!/^NavigationDuplicated/.test(err)) {
       console.log(err);
     }
   })
}
