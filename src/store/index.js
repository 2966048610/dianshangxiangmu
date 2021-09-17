import Vue from 'vue';
import Vuex from 'vuex';

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

// 1、安装 Vuex 插件
Vue.use(Vuex);




// 封装思想




// 创建 Store 对象
const store = new Vuex.Store({
  state: {
    cartList: []
  },


  // 第一种做法：数据监测模糊
  /* mutations: {

    // mutations 唯一的目的就是为了修改state中的状态
    // mutations 中的每个方法尽可能完成的时间比较单一一点


    addCart(state,payload) {

      // payload 新添加的商品

      // 第一种方法： for 循环的方式：
      // let oldProduct = null;
      // // 用 for 循环判断 添加的商品是不是一样的，
      // for(let item of state.cartList) {
      //   if(item.iid === payload.iid) {
      //     oldProduct = item;
      //   }
      // }

      // 第二种方法：数组 方法 find () :
      // 查找之前数组中是否有该商品
      let oldProduct = state.cartList.find(item => item.iid === payload.iid)

      // 判断 oldProduct
      if(oldProduct) {   // 之前若是有同样的商品 ，那这个商品的数量就 加一
        oldProduct.count += 1
      }else {       // 之前若是没有这个商品，那这个商品的数量就为一，并把它加入payload
        payload.count = 1
        state.cartList.push(payload)
      }

    }

  }, */


  // 第二种做法：修改了哪里可以实时监测
  mutations,
  actions,
  getters

});


// 挂载 Vue 实例上
export default store
