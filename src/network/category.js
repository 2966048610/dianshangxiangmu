import {request} from 'network/request';

// 左边 商品分类的数据
export function getCategory() {
  return request({
    url:'/category'
  })
}

// 右边 商品 的 详细数据
export function getSubcategory(maitKey) {
  return request({
    url:'/subcategory',
    params: {
      maitKey
    }
  })
}

// '综合','新品','销量' 的数据
export function getCategoryDetail(miniWallkey, type) {
  return request({
    url:'/subcategory/detail',
    params: {
      miniWallkey,
      type
    }
  })
}


