import {request} from 'network/request';

export function getDetail(iid){
  return request({
    url:'/detail',
    params: {
      iid
    }
  })
}


// 创建一个类 ，用来接收 服务器传回来的数据，对数据进行封装
export class Goods {
  // constructor(){} 构造函数
  constructor(itemInfo, columns, services) {
      this.title = itemInfo.title
      this.desc = itemInfo.desc
      this.newPrice = itemInfo.price
      this.oldPrice = itemInfo.oldPrice
      this.discount = itemInfo.discountDesc
      this.columns = columns
      this.services = services
      this.realPrice = itemInfo.lowNowPrice
      
  }
}

// 对 店铺详情 的数据进行封装
export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
  }
}



