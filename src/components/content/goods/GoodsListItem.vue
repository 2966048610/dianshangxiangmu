<template>
  <div class="goods-item">
    <!-- @load 当图像加载完成后执行 -->
    <img :src="goodsItem.show.img" @load="imageLoad" >

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
    methods:{
      imageLoad() {
        this.$bus.$emit('itemImageLoad')  // 传值
      }
    }
  }
</script>

<style>
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
