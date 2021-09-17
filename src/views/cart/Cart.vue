<template>
  <div id="cart">

    <!-- 导航栏 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ cartLength }})</div>
    </nav-bar>

    <!-- 商品列表 -->
    <cart-list></cart-list>


    <!-- 底部汇总 -->
    <cart-bottom-bar></cart-bottom-bar>



  </div>

</template>

<script>

  // 导入 mapGetters ; 在vuex 里面
  import {mapGetters} from 'vuex'


  // 导航栏
  import NavBar from 'components/common/navbar/NavBar'

  // 商品列表
  import CartList from './childComps/CartList'
  
  // 底部汇总
  import CartBottomBar from './childComps/CartBottomBar'



  export default {
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },

    // 计算属性
    computed:{
      // 第一种做法: 直接在购物车这里拿购物车商品数量
      /* cartLength() {
        return this.$store.state.cartList.length
      } */

      // 第二种做法:对购物车商品数量进行封装,在 store 文件夹里面进行封装,适用于使用数次多的情况
      // 这中做法需要用到 vuex ； 把在 store/getters 文件 里面定义的 函数 转为 计算属性 ；
      ...mapGetters(['cartLength'])   // 转换成计算属性的第一种写法；以数组的方式输入需要转换的属性

      /* ...mapGetters({      // 转换成计算属性的第二种写法，以对象的方式输入需要转换的属性，例:length:'cartLength',在模板中直接用length就可以了
        length:'cartLength',  // 将 'cartLength' 映射 给 length
      }) */




    }



  }



</script>

<style scoped>

  #cart{
    height: 100vh;
  }

  /* 购物车的导航 */
  .nav-bar{
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }





</style>
