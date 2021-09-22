<template>
  <div class="bottom-menu">

    <!-- 复选框 -->
    <div class="check-kuang">
      <check-button class="check-button" :is-checked='isSelectAll' @click.native='checkClick' ></check-button>
      <span>全选</span>
    </div>

    <span class="total-price">合计: ¥{{totalPrice}}</span>

    <span class="buy-product" @click="calcClick">去计算({{checkLength}})</span>

  </div>
</template>

<script>

  import CheckButton from 'components/content/checkButton/CheckButton'

  import {mapGetters} from 'vuex'

  export default {
    components: {
      CheckButton
    },

    // 计算属性
    computed:{
      ...mapGetters(['cartList']),
      // 计算 选中商品的 总价
      totalPrice() {
        return this.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
        },0).toFixed(2)    // toFixed(2)  保留两位小数
      },

      // 计算 选中的 商品的 个数
      checkLength() {
        return this.cartList.filter(item => item.checked).length
      },

      // 计算 商品有没有 全选
      isSelectAll() {
        // 判断 cartList 数组的长度 为 0 时, 返回 false ，就是没有商品时 不选中 全选按钮
        if(this.cartList.length === 0) return false

        // 第一种方法：filter():遍历；
        // return !(this.cartList.filter(item => !item.checked).length)


        // 第二种方法:  find():查找；只要 cartList 数组中 有一个商品的 checked 没有选中 ，就返回 false
        return !this.cartList.find(item => !item.checked)


        // 第三种方法:普通的 for 循环遍历:
        /* for (let item of this.cartList) {
          if(!item.checked){
            return false
          }
        }
        return true */

      },

    },

    methods: {
      // 全选按钮
      checkClick() {
        if(this.isSelectAll){   // 判断是否 是 全部选中 的 状态 ，
          // 商品 全部为全部选中时 ，把 checked 改为 false ；改为全部 不选中
          this.cartList.forEach(item => item.checked = false)
        }else {   //  商品 部分 或者 全部  处于 不选中 的状态
          // 把 checked 改为 true ；改为全部 选中
          this.cartList.forEach(item => item.checked = true)
        }
      },

      // 去计算
      calcClick(){
        if(!this.checkLength) {
          // $toast.toast 已经以 插件的方式 封装完成 ,在页面中可以直接调用
          this.$toast.toast('请选择购买的商品')
        }
      }
    },





  }




</script>

<style scoped>
  .check-kuang{
    display: flex;
    align-items: center;
    flex: 1;
  }
  .check-button {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }

  .bottom-menu {
    width: 100%;
    height: 44px;
    background-color: #eee;
    position: fixed;
    bottom: 49px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    /* line-height: 44px; */
    padding-left: 15px;
    box-sizing: border-box;

    display: flex;
    align-items: center;
    justify-content: center;
  }

 /* .bottom-menu .select-all {
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
  } */

  .bottom-menu .total-price {
    /* margin-left: 15px; */
    font-size: 16px;
    color: #666;
    flex: 1;
  }

  .bottom-menu .buy-product {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    /* float: right; */
    flex: 1;
  }
</style>
