// 封装思想

import {ADD_COUNTER , ADD_TO_CART} from "./mutation-types"

export default {
  addCart(context,payload) {

    // payload 新添加的商品
    // 第二种方法：数组 方法 find () :
    // 查找之前数组中是否有该商品
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

    // 判断 oldProduct
    if(oldProduct) {   // 之前若是有同样的商品 ，那这个商品的数量就 加一
      // oldProduct.count += 1
      context.commit(ADD_COUNTER ,oldProduct)

    }else {       // 之前若是没有这个商品，那这个商品的数量就为一，并把它加入payload
      payload.count = 1
      // context.state.cartList.push(payload)
      context.commit(ADD_TO_CART ,payload)
    }

  }
}
