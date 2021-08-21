<template>
  <div id="home">

    <!-- 首页的导航 -->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <!-- 轮播图的 组件 -->
    <home-swiper :banners="banner"></home-swiper>

    <!-- 推荐信息的 组件 -->
    <recommend-view :recommend='recommend' />

    <!-- 本周流行 组件 -->
    <feature-view></feature-view>


    <tab-control class="tab-control" :titles="['流行','新款','精选']"></tab-control>


<ul>
  <li>1</li>
  <li>1</li>
  <li>1</li>
  <li>1</li>
  <li>1</li>
  <li>1</li>
</ul>

  </div>

</template>

<script>

  // 数据请求 组件
  import { getHomeMuitidata , getHomeGoods } from 'network/home'


  // 首页的导航 组件
  import NavBar from 'components/common/navbar/NavBar'
  // 流行,新款,精选 组件
  import TabControl from 'components/content/tabControl/TabControl'


  // 轮播图的 组件
  import HomeSwiper from './childComps/HomeSwiper'
  // 推荐信息的 组件
  import RecommendView from './childComps/RecommendView'
  // 本周流行 组件
  import FeatureView from './childComps/FeatureView.vue'


  export default {
    components:{

      NavBar,
      TabControl,

      HomeSwiper,
      RecommendView,
      FeatureView,

    },
    data(){
      return {
        banner:[],
        // dKeyword:[],
        // keywords:[],
        recommend:[],

        goods:{
          'pop':{page:0 , list:[]},
          'news':{page:0 , list:[]},
          'sell':{page:0 , list:[]},
        }

      }

    },
    created(){
      // 请求多个数据
      this.getHomeMuitidata()

      // 请求商品数据
      this.getHomeGoods('pop')

    },

    methods:{
      // 请求多个数据
      getHomeMuitidata(){
        getHomeMuitidata().then(res => {
          // console.log(res);
          this.banner = res.data.banner.list ;
          // this.dKeyword = res.data.dKeyword.list ;
          // this.keywords = res.data.keywords ;
          this.recommend = res.data.recommend.list ;
        })
      },

      // 请求商品数据
      getHomeGoods(type){
        const page = this.goods[type].page + 1
        getHomeGoods(type,1).then(res => {
          console.log(res);
        })
      }

    }
  }
</script>

<style>
  /* 首页的导航 */
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
  }

.tab-control{
  position: sticky;
  top: 44px;
}





ul{
  width: 100px;
  height: 1000px;
}


</style>
