<template>
  <div class="cart-list">
    <scroll class="content" ref='scroll'>
      <cart-list-item v-for="(item,index) in cartList" :key='index' :item-info='item'></cart-list-item>
    </scroll>

  </div>
</template>

<script>

  import {mapGetters} from 'vuex'

  import Scroll from 'components/common/scroll/Scroll'

  import CartListItem from './CartListItem'

  export default {

    components: {
      Scroll,
      CartListItem
    },


    // 计算属性
    computed:{

      // 第二种做法:对购物车商品数量进行封装,在 store 文件夹里面进行封装,适用于使用数次多的情况
      // 这中做法需要用到 vuex ； 把在 store/getters 文件 里面定义的 函数 转为 计算属性 ；
      ...mapGetters(['cartList'])   // 转换成计算属性的第一种写法；以数组的方式输入需要转换的属性
    },

    activated() {
      // 进入页面时重新计算页面高度
      this.$refs.scroll.refresh()
    }


  }


</script>

<style scoped>
.cart-list{
  height: calc(100% - 44px - 49px);
  overflow: hidden;
}
.content{
  height: 100%;
}



</style>
