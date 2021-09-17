<template>
  <div class="goods-item" @click="itemClick" >
    <!-- @load 当图像加载完成后执行 -->
    <!-- 使用了图片懒加载后 ，需要添加 一个 key -->
    <img v-lazy="showImage" :key='showImage' @load="imageLoad" >

    <div class="goods-info">
      <p> {{goodsItem.title}} </p>
      <span class="price"> {{goodsItem.price}} </span>
      <span class="collect"> {{goodsItem.cfav}} </span>
    </div>
  </div>
</template>

<script>
  export default{
    props:{
      goodsItem:{
        type:Object,
        default(){
          return {}
        }
      }
    },

    // 计算属性
    computed: {
      showImage() {
        return this.goodsItem.image || this.goodsItem.show.img
      }
    },


    methods:{
      imageLoad() {

          // this.$bus.$emit('itemImageLoad')  // 给首页home传值，用事件总线的方式

        // 判断路由是否 跳往首页 ,跳往首页才执行
        if(this.$route.path.indexOf('/home')) {
          this.$bus.$emit('itemImageLoad')  // 给首页home传值，用事件总线的方式
        }

      },

      // 点击进入详情页
      itemClick(){
        console.log('进入详情页');
        // 进入到详情页需要传参数
        // const id = this.goodsItem.iid || this.goodsItem.item_id
        this.$router.push('/detail/' + this.goodsItem.iid)
        // console.log(id);
      }
    }
  }
</script>

<style scoped>
  .goods-item{
    width: 45%;
    padding-bottom: 30px;
    margin-bottom: 15px;

    position: relative;

  }
  .goods-item img{
    width: 100%;
    border-radius: 5px;
    margin-bottom: 5px;
  }
  .goods-info{
    width: 100%;
    font-size: 12px;

    overflow: hidden;
    /* text-align: center; */

    position: absolute;
    bottom: 0;

  }
  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 5px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }
  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }

</style>
