<template>

  <div id="detail">
    <!-- 详情页{{iid}} -->
    <detail-nav-bar class="detail-nav" ref='nav' @titleClick='titleClick'></detail-nav-bar>

    <scroll class="content" ref='scroll' @scroll='contentScroll' :probe-type='3'>

      <!-- 获取顶部的图片轮播数据 -->
      <detail-swiper :top-images='topImages'></detail-swiper>

      <!-- 接收商品详情的数据 -->
      <detail-base-info :goods='goods'></detail-base-info>

      <!-- 店铺详情 -->
      <detail-shop-info :shop='shop'></detail-shop-info>

      <!-- 商品的详情数据 -->
      <detail-goods-info :detail-info='detailInfo' @imageLoad='imageLoad' ></detail-goods-info>

      <!-- 参数 -->
      <detail-param-info ref='param' :param-info='paramInfo'></detail-param-info>

      <!-- 评论 -->
      <detail-comment-info ref='comment' :commentInfo='commentInfo'></detail-comment-info>

      <!-- 推荐 -->
      <goods-list ref='recommenc' :goods='recommends'></goods-list>

    </scroll>

    <!-- 底部 -->
    <detail-bottom-bar></detail-bottom-bar>


  </div>
</template>

<script>


  import {getDetail, getRecommend , Goods , Shop , GoodsParam} from 'network/datail'
  import {debounce} from 'common/utils'

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'

  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'


export default {
  name:'Detail',

  components: {


    Scroll,
    GoodsList,

    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,

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

      // 评论
      commentInfo:{},

      // 推荐 的数据
      recommends:[],

      // 点击标题滚动到对应的位置
      themeTopYs:[],
      getThemeTopY:null,  // 对计算高度的赋值 进行防抖
      currentIndex:0,



    }
  },

  created() {
    // 获取传进来的数据 this.$route.params
    // console.log(this.$route.params);
    // console.log(this.$route.params.id);
    // 保存传入的id
    if(this.$route.params.id){
      this.iid = this.$route.params.id
    }

    // 调用getDetail发起请求
    this.getDetail()

    // 发起请求获取 推荐的数据
    this.getRecommend()

    // 给 this.getThemeTopY 赋值 ，（对给 this.getThemeTopY 赋值的操作进行防抖）
    this.getThemeTopY = debounce(() => {
      this.themeTopYs=[]
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.param.$el.offsetTop -  44)    // 减 44 是 减去 顶部 导航栏的高度
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44 )
      this.themeTopYs.push(this.$refs.recommenc.$el.offsetTop - 44)
      this.themeTopYs.push(Number.MAX_VALUE)   // 为 this.getThemeTopY 加一个最大值 ，为了 下面 的if判断 hack 写法
      console.log(this.themeTopYs);
    },100)
  },

  mounted() {

  },

  // 有数据更新就会调用
  updated() {

  },

  methods:{

    getDetail(){
      // 根据iid请求详情数据
      getDetail(this.iid).then(res => {
        // console.log(res);

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

        // 参数 的数据
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

        // 评论 的信息
        if(data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }




      })
    },

    // 请求推荐数据
    getRecommend() {
      getRecommend().then(res => {
        // console.log(res);
        this.recommends = res.data.list
      })
    },

    // 点击顶部导航栏 的主题时 跳到对应的位置
    titleClick(index) {
      console.log(index);
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
    },



    // 图片加载完成重新计算高度
    imageLoad(){
      this.$refs.scroll.refresh()

      // 点击标题滚动到对应的位置 ，对高度的计算进行防抖，这图片加载完成后调用
      this.getThemeTopY()

    },

    contentScroll(position) {
      // 1、获取到 y 的值
      const positionY = -position.y
      // console.log(positionY);

      // 2、 positionY 和 顶部主题中的值进行对比
      // [0, 7938 , 9120 , 9452 ， Number.MAX_VALUE ]

      // positionY 在 0 和 7938 之间 ， index = 0
      // positionY 在 7938 和 9120 之间 ， index = 1
      // positionY 在 9120 和 9452 之间 ， index = 2
      // positionY 在 9452 和 最大的值 之间 ， index = 3   // hack 写法 需要 最大的值

      // positionY 大于等于 9452 之间 ， index = 3

      let length = this.themeTopYs.length; // 获取到 this.themeTopYs 的长度 ，赋值给length

      // 普通写法:
      /* for(let i = 0 ; i < length ; i++) {
        //  if (     &&    (   (   &&   &&   )   ||   (   &&   )   )   )   if判断条件用到的 逻辑判断
        if( this.currentIndex !== i && ( (i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i === length - 1 && positionY >= this.themeTopYs[i]) ) ) {
          this.currentIndex = i
          console.log(this.currentIndex);
          this.$refs.nav.currentIndex = this.currentIndex
        }
      } */

      // hack 写法:
      for(let i = 0 ; i < length - 1 ; i++ ){
        if( this.currentIndex !== i && ( positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1] ) ){
          this.currentIndex = i
          console.log(this.currentIndex);
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }


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
  height: calc(100% - 44px - 49px);
}



</style>
