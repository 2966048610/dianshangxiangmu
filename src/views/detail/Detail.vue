<template>

  <div id="detail">
    <!-- 详情页{{iid}} -->
    <detail-nav-bar class="detail-nav"></detail-nav-bar>

    <scroll class="content" ref='scroll'>

      <!-- 获取顶部的图片轮播数据 -->
      <detail-swiper :top-images='topImages'></detail-swiper>
      
      <!-- 接收商品详情的数据 -->
      <detail-base-info :goods='goods'></detail-base-info>

      <!-- 店铺详情 -->
      <detail-shop-info :shop='shop'></detail-shop-info>

      <!-- 商品的详情数据 -->
      <detail-goods-info :detail-info='detailInfo' @imageLoad='imageLoad' ></detail-goods-info>
      
      <!-- 参数 -->
      <detail-param-info :param-info='paramInfo'></detail-param-info>

    </scroll>


  </div>
</template>

<script>


  import {getDetail, Goods , Shop , GoodsParam} from 'network/datail'

  import Scroll from 'components/common/scroll/Scroll'

  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'


export default {
  name:'Detail',

  components: {


    Scroll,

    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,

  },


  data() {
    return {
      // 接收上个页面传来的值
      iid: null,

      // 获取顶部的图片轮播数据
      topImages:[],

      // 接收商品详情的数据
      goods:{},

      // 店铺详情
      shop:{},

      // 商品的详情数据
      detailInfo:{},

      // 参数 的信息
      paramInfo:{},


    }
  },

  created() {
    // 获取传进来的数据 this.$route.params
    console.log(this.$route.params);
    console.log(this.$route.params.id);
    // 保存传入的id
    if(this.$route.params.id){
      this.iid = this.$route.params.id
    }

    // 调用getDetail发起请求
    this.getDetail()

  },

  methods:{

    getDetail(){
      // 根据iid请求详情数据
      getDetail(this.iid).then(res => {
        console.log(res);

        // 获取顶部的图片轮播数据
        this.topImages = res.result.itemInfo.topImages
        // 把 res.result 赋值 给 data
        const data = res.result;

        // new 一个对象Goods,传入三个参数，传入对应的参数
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

        // 把店铺详情的数据传入 Shop对象
        this.shop = new Shop(data.shopInfo)

        // 保存商品的详情数据
        this.detailInfo = data.detailInfo

        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)



      })
    },

    imageLoad(){
      this.$refs.scroll.refresh()
    }


  },

  // 页面销毁时执行
  destroyed() {
    console.log('组件销毁了');
  }



}




</script>


<style scoped>

#detail{
  position: relative;
  z-index: 101;
  background-color: #ffffff;
  height: 100vh;
}

.detail-nav{
  position: relative;
  z-index: 101;
  background-color: #ffffff;

}

.content{
  height: calc(100% - 44px);
}



</style>
