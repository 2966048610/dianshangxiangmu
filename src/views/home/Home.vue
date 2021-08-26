<template>
  <div id="home">

    <!-- 首页的导航 -->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <!-- 使用 视图滚动插件封装的组件 ，让这一部分内容能够滚动 的 更利索 -->
    <scroll class="content" ref="scroll" :probe-type="3" @scroll='contentScroll' >

      <!-- 轮播图的 组件 -->
      <home-swiper :banners="banner"></home-swiper>

      <!-- 推荐信息的 组件 -->
      <recommend-view :recommend='recommend' />

      <!-- 本周流行 组件 -->
      <feature-view></feature-view>

      <!-- 流行,新款,精选 组件 -->
      <tab-control class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick"></tab-control>
       <!-- 商品展示 组件 -->
      <goods-list :goods='name' ></goods-list>

    </scroll>

    <!-- 点击 返回 顶部 组件 -->
    <!-- 组件添加 原生事件时，需要添加修饰符 .native -->
    <back-top @click.native='backClick' v-show="isShowBackTop" ></back-top>

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
  /*
    * 网络 组件
  */
  // 数据请求 组件
  import { getHomeMuitidata , getHomeGoods } from 'network/home'

  /*
   * 公共 组件
  */
  // 首页的导航 组件
  import NavBar from 'components/common/navbar/NavBar'
  // 视图滚动插件封装的组件
  import Scroll from 'components/common/scroll/Scroll'


  /*
   * 公共 组件 中和本项目业务有关的组件
  */
  // 流行,新款,精选 组件
  import TabControl from 'components/content/tabControl/TabControl'
  // 商品展示 组件
  import GoodsList from 'components/content/goods/GoodsList'
  // 点击 返回 顶部 组件
  import BackTop from 'components/content/backTop/BackTop'



  /*
   * 首页的 组件
  */
  // 轮播图的 组件
  import HomeSwiper from './childComps/HomeSwiper'
  // 推荐信息的 组件
  import RecommendView from './childComps/RecommendView'
  // 本周流行 组件
  import FeatureView from './childComps/FeatureView.vue'


  export default {
    components:{

      // 公共 组件
      NavBar,
      Scroll,

      // 公共 组件 中和本项目业务有关的组件
      TabControl,
      GoodsList,
      BackTop,

      // 首页的 组件
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
          'new':{page:0 , list:[]},
          'sell':{page:0 , list:[]},
        },

        currentType : 'pop',

        isShowBackTop:false

      }

    },

    // 生命周期 ，页面创建后执行
    created(){
      // 请求多个数据
      this.getHomeMuitidata()

      // 请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },

    // 计算属性
    computed: {
      name() {
        return this.goods[this.currentType].list
      }
    },


    methods:{

      /*
        * 事件监听相关的方法
      */

     // 监听 页面点击事件，判断获取goods中的哪个数据
      tabClick(index){
        switch(index){
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
      },

      backClick(){
        // console.log(1);
        this.$refs.scroll.scrollTo(0,0,500)
      },

      contentScroll(position){
        // console.log(position,-position.y);
        this.isShowBackTop = (-position.y) > 1000
      },




      /*
        * 网路请求相关的方法
      */
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
        getHomeGoods(type,page).then(res => {
          // console.log(res);
          // console.log(res.data.list);
          this.goods[type].list.push(...res.data.list)   // 使用 ... 这种语法的意思是 ：把数据解构，然后一个一个的添加到数组中
          this.goods[type].page += 1
        })
      }

    }
  }
</script>

<style scoped>
  #home{
    height: 100vh;
    position: relative;
  }
  /* 首页的导航 */
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
  }

  .tab-control{
    position: sticky;
    top: 44px;
  }

  /* 第一种方法 */
  .content{
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  /* 第二种方法 */
  /* .content{
    height: calc(100% - 93px);
    margin-top: 44px;
    overflow: hidden;
  } */



ul{
  width: 100px;
  height: 1000px;
}


</style>
