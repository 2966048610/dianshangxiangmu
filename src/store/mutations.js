// 封装思想


import {ADD_COUNTER , ADD_TO_CART} from "./mutation-types"


// 第二种做法：修改了哪里可以实时监测
export default {
  // mutations 唯一的目的就是为了修改state中的状态
  // mutations 中的每个方法尽可能完成的时间比较单一一点

  [ADD_COUNTER](state, payload) {  // 实现 相同商品 的数量  加 一
    payload.count ++
  },
  [ADD_TO_CART](state, payload) {  // 实现 添加 新的商品
    payload.checked = true    // 添加一个属性，用来记录商品有没有被选中
    state.cartList.push(payload)
  }


}
