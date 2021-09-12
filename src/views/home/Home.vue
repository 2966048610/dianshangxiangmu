<template>
  <div id="home">

    <!-- 首页的导航 -->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <!-- 流行,新款,精选 组件 -->
    <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2" class="tabControlClass" v-show="isTabFixed" ></tab-control>

    <!-- 使用 视图滚动插件封装的组件 ，让这一部分内容能够滚动 的 更利索 -->
    <scroll class="content" ref="scroll" :probe-type="3" @scroll='contentScroll' :pull-up-load="true" @pullingUp='loadMore' >

      <!-- 轮播图的 组件 -->
      <home-swiper :banners="banner" @swiperImageLoad="swiperImageLoad" ></home-swiper>

      <!-- 推荐信息的 组件 -->
      <recommend-view :recommend='recommend' />

      <!-- 本周流行 组件 -->
      <feature-view></feature-view>

      <!-- 流行,新款,精选 组件 -->
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl1" ></tab-control>
       <!-- 商品展示 组件 -->
      <goods-list :goods='name' ></goods-list>

    </scroll>

    <!-- 点击 返回 顶部 组件 -->
    <!-- 组件添加 原生事件时，需要添加修饰符 .native -->
    <back-top @click.native='backClick' v-show="isShowBackTop" ></back-top>

<!-- <ul>
  <li>1</li>
  <li>1</li>
  <li>1</li>
  <li>1</li>
  <li>1</li>
  <li>1</li>
</ul> -->

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



  // js文件引入
  // 导入 封装的 防抖函数 debounce()
  import { debounce } from 'common/utils'


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

        // 先设计数据结构,再发送请求
        goods:{
          'pop':{page:0 , list:[]},
          'new':{page:0 , list:[]},
          'sell':{page:0 , list:[]},
        },

        // 判断是 goods中 的哪个 商品
        currentType : 'pop',

        // 返回顶部
        isShowBackTop:false ,

        // TabControl 组件 吸顶效果
        tabOffsetTop:0,
        isTabFixed:false,

        // 记录页面离开和进入的位置
        saveY:0,

      }

    },

    // 生命周期 ，页面创建后执行
    created(){
      console.log('页面创建完成');

      // 请求多个数据
      this.getHomeMuitidata()

      // 请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')




    },

    // mounted是vue中的一个钩子函数,一般在初始化页面完成后,再对dom节点进行相关操作。
    mounted() {
      console.log('页面已创建完成，开始执行 mounted()');


      // 把 this.$refs.scroll.refresh() 作为参数 传入 防抖函数 debounce() ,并赋值给 refresh 变量
      let refresh = debounce(this.$refs.scroll.refresh,50)
      // 监听 item 中图片的加载完成 ，
      this.$bus.$on('itemImageLoad', () => {
        // 每一张图片加载完成， scroll 都需要 重新计算高度 , 这种方式可能会耗性能
        // this.$refs.scroll.refresh()
        refresh()
        console.log('每一张图片加载完成， scroll 都需要 重新计算高度 , 这种方式可能会耗性能 , 因此 需要 使用防抖函数 debounce() ')
      });

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
        };

        // 为了让 两个组件 保持 相同的 点击
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index


      },

      // 点击返回顶部
      backClick(){
        // console.log(1);
        this.$refs.scroll.scrollTo(0,0,500)
      },
      //监听滚动的位置
      contentScroll(position){
        // 监听滚动的位置,点击返回顶部 模块的显示和隐藏
        // console.log(position,-position.y);
        this.isShowBackTop = (-position.y) > 1000

        // 判断 决定 tabControl 是否 吸顶 ( position:fixed )
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      // 上拉加载 更多
      loadMore(){
        console.log('上拉加载 更多');
        this.getHomeGoods(this.currentType)
        // 获取完数据之后 scroll 需要 重新计算高度
        // this.$refs.scroll.refresh()
      },
      // 监听图片加载完成时执行 ，计算 tabcontrol 中的 offsetTop 的高度 ，完成 tabcontrol 组件的吸顶效果
      swiperImageLoad() {
        // 获取 tabcontrol 中的 offsetTop
        // 所有的组件都有一个属性 $el :用于获取组件中的元素
        this.tabOffsetTop = this.$refs.tabControl1.$el.offsetTop
        console.log(this.tabOffsetTop);
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
        const page = this.goods[type].page + 1  // 获取页码

        getHomeGoods(type,page).then(res => {
          // console.log(res);
          // console.log(res.data.list);
          this.goods[type].list.push(...res.data.list)   // 使用 ... 这种语法的意思是 ：把数据解构，然后一个一个的添加到数组中
          this.goods[type].page += 1    // 页码加 1

          // 上拉加载完毕后需要执行 finishPullUp() 方法
          this.$refs.scroll.finishPullUp();

        });
      }

    },

    // 页面销毁时执行
    destroyed() {
      console.log('页面销毁了');
    },

    // 进入页面时执行activated
    activated() {
      console.log('调用activated，进入页面时执行');

      // 进入页面时回到上次离开时的位置
      this.$refs.scroll.scrollTo(0,this.saveY,0);
      // 进入页面时刷新scroll
      this.$refs.scroll.refresh()
      console.log(this.$refs.scroll.refresh());
      console.log(this.saveY);
    },
    // 离开页面时执行deactivated
    deactivated() {
      console.log('调用deactivated，离开页面时执行');

      // 离开页面时记录位置
      // this.saveY = this.$refs.scroll.scroll.y
      this.saveY = this.$refs.scroll.getScrollY()
      console.log(this.saveY);

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


.tabControlClass{
  position: relative;
  z-index: 10;
}


</style>
