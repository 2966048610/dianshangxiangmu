<template>
  <div id="category">

    <!-- 导航栏 -->
    <nav-bar class="nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>

    <div class="content">

      <!-- 左边 商品分类 -->
      <tab-menu :categories='categories' @selectItem='selectItem' ></tab-menu>

      <!-- 右边 商品 详细数据 -->
      <div id="tab-left">
        <!-- '综合','新品','销量'  组件 -->
        <tab-control :titles="['综合','新品','销量']" @tabClick="tabClick" class="tabCategoryClass" ref="tabControl2" v-show="isTabFixed" ></tab-control>

        <scroll id="tab-content" ref='scroll' :probe-type="3" @scroll='contentScroll'>

          <!-- 右边 商品 详细数据 的 最上方的数据 -->
          <tab-content-category :subcategories='subcategories' ref='tabContentCategory' @TabContentCategoryImageLoad='TabContentCategoryImageLoad' ></tab-content-category>

          <!-- '综合','新品','销量'  组件 -->
          <tab-control :titles="['综合','新品','销量']" @tabClick="tabClick" ref="tabControl1" ></tab-control>

          <!-- 综合','新品','销量' 商品展示 的 组件 -->
          <goods-list :goods="goodsListShuJu"/>


        </scroll>

        <!-- 点击 返回 顶部 组件 -->
        <!-- 组件添加 原生事件时，需要添加修饰符 .native -->
        <back-top @click.native='backClick' v-show="isShowBackTop" ></back-top>

      </div>

    </div>



  </div>

</template>

<script>

  import {getCategory , getSubcategory , getCategoryDetail} from 'network/category'

  // js文件引入
  // 导入 封装的 防抖函数 debounce()
  import { debounce } from 'common/utils'

  // 导航栏
  import NavBar from 'components/common/navbar/NavBar'
  // 滑块
  import Scroll from 'components/common/scroll/Scroll'
  // '综合','新品','销量'  组件
  import TabControl from 'components/content/tabControl/TabControl'
  // 综合','新品','销量' 商品展示 的 组件
  import GoodsList from 'components/content/goods/GoodsList'
  // 点击 返回 顶部 组件
  import BackTop from 'components/content/backTop/BackTop'

  // 左边商品分类
  import TabMenu from './childComps/TabMenu'

  // 右边 商品 详细数据
  import TabContentCategory from './childComps/TabContentCategory'



	export default{
    components: {

      NavBar,
      Scroll,
      TabControl,
      GoodsList,
      BackTop,

      TabMenu,
      TabContentCategory,


    },

    data() {
      return {

        // 左边 商品分类的数据
        categories:[],

        // 右边 商品 详细数据
        subcategories:[],

        // '综合','新品','销量' 这部分的数据
        // 先设计数据结构,再发送请求
        goods:{
          'pop':{page:0 , list:[]},
          'new':{page:0 , list:[]},
          'sell':{page:0 , list:[]},
        },
        // 判断是 goods中 的哪个 商品
        currentType : 'pop',

        // 记录页面离开和进入的位置
        saveY:0,

        // 右边 商品 详细数据 的 最上方的数据 的 组件 的高度
        tabOffsetTop:0,
        isTabFixed:false,

        // 返回顶部
        isShowBackTop:false ,

      }
    },
    created() {

      this.getCategory()

    },

    // 计算属性
    computed: {
      // 计算属性 返回'综合','新品','销量' 这部分的数据
      goodsListShuJu() {
        return this.goods[this.currentType].list
      }

    },
		methods:{

      // 左边 商品分类 的数据
      getCategory() {
        getCategory().then(res => {
          // console.log(res);
          this.categories = res.data.category.list;

          // 在 进入 页面时 请求 第一个 商品分类 对应 的 右边的 数据
          this.getSubcategory(this.categories[0].maitKey)
          this.getCategoryDetail(this.categories[0].miniWallkey,'pop')
          this.getCategoryDetail(this.categories[0].miniWallkey,'new')
          this.getCategoryDetail(this.categories[0].miniWallkey,'sell')

        })
      },

      // 右边 商品 的详细数据
      getSubcategory(maitKey) {
        getSubcategory(maitKey).then(res => {
          // console.log(res);
          this.subcategories = res.data.list

        })
      },

      // '综合','新品','销量' 这部分的数据
      getCategoryDetail(miniWallkey,type) {
        // console.log(miniWallkey,type);
        getCategoryDetail(miniWallkey, type).then(res => {
          // console.log(res);
          this.goods[type].list = res

        })
      },




      // 点击左边的商品分类时 请求 右边 商品 的详细数据
      selectItem(maitKey , miniWallkey) {
        this.getSubcategory(maitKey);

        this.getCategoryDetail(miniWallkey,'pop')   // 请求 综合(pop) 的数据
        this.getCategoryDetail(miniWallkey,'new')   // 请求 新品(new) 的数据
        this.getCategoryDetail(miniWallkey,'sell')  // 请求 销量(sell) 的数据
        this.$refs.tabControl1.currentIndex = 0;    // 把 '综合','新品','销量'  组件 的下标 设为 0


        // 点击 左边 的 商品 分类 时 ，右边的位置 回到顶部
        this.$refs.scroll.scrollTo(0,0,0);

        // 点击了 左边的商品分类之后 间隔 两秒 后 执行 。
        setTimeout(() => {
          this.TabContentCategoryImageLoad()  // 调用图片加载完成后的执行
        },2000)


      },


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


      //监听滚动的位置
      contentScroll(position){
        // 监听滚动的位置,点击返回顶部 模块的显示和隐藏
        // console.log(position,-position.y);
        this.isShowBackTop = (-position.y) > 1000


        // 判断 决定 tabControl 是否 吸顶 ( position:fixed )
        this.isTabFixed = (-position.y) > this.tabOffsetTop
        // console.log(this.tabOffsetTop);

      },

      // 右边 商品 详细数据 的 最上方的数据 的 图片加载完成后执行
      TabContentCategoryImageLoad() {
        // 图片加载完成， scroll 需要 重新计算高度 , 这种方式可能会耗性能
        this.$refs.scroll.refresh();

        // 获取 tabControl1 组件 距离顶部 的距离
        this.tabOffsetTop = this.$refs.tabControl1.$el.offsetTop;
        // console.log(this.tabOffsetTop);
      },
      
      
      // 点击返回顶部
      backClick(){
        // console.log(1);
        this.$refs.scroll.scrollTo(0,0,500)
      },


		},




    // 页面创建完成后调用
    mounted(){

      // 把 this.$refs.scroll.refresh() 作为参数 传入 防抖函数 debounce() ,并赋值给 refresh 变量
      let refresh = debounce(this.$refs.scroll.refresh,50);
      // 监听 item 中图片的加载完成 ，
      this.$bus.$on('categoryItemImageLoad', () => {
        // 每一张图片加载完成， scroll 都需要 重新计算高度 , 这种方式可能会耗性能
        // this.$refs.scroll.refresh()
        refresh()
        console.log('每一张图片加载完成， scroll 都需要 重新计算高度 , 这种方式可能会耗性能 , 因此 需要 使用防抖函数 debounce() ')
        // this.tabOffsetTop = this.$refs.tabControl1.$el.offsetTop;
        // console.log(this.tabOffsetTop);

      });

    },

    // 数据更新后调用
    updated() {

    },

    // 组件销毁时调用
    destroyed() {

    },

    activated() {
      console.log('进入页面了');
      // 进入页面时刷新scroll ; 在这里先刷新 ，之后再回到上次离开的位置
      this.$refs.scroll.refresh()

      // 进入页面时回到上次离开时的位置
      this.$refs.scroll.scrollTo(0,this.saveY,0);

    },

    // 离开页面时调用
    deactivated() {
      // 离开页面时记录位置
      // this.saveY = this.$refs.scroll.scroll.y
      this.saveY = this.$refs.scroll.getScrollY()

    }


	}
</script>

<!-- scoped 规定样式作用域 ， 只对本页面起效果 -->
<style scoped>

  #category{
    height: 100vh;
  }

  /* 购物车的导航 */
  .nav-bar{
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }

  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;

    display: flex;
  }

  #tab-left{
    width: calc(100% - 100px);
    flex: 1;
  }

  /* 滑动 */
  #tab-content {
    position: absolute;
    top: 0;
    height: 100%;
    overflow: hidden;

  }


  .tabCategoryClass{
    position: relative;
    z-index: 10;
  }
</style>
