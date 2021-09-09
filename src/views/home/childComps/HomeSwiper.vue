<template>
  <swiper>
    <swiper-item v-for="(item,index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
    name: "HomeSwiper",
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        isLoad: false
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods: {
      // 监听图片加载完成
      imageLoad() {
        // 判断 this.isLoad 不等于 true 时执行 ,
        if (!this.isLoad) {
          this.$emit('swiperImageLoad');   // 给父组件传值
          this.isLoad = true  ;   // 把 this.isLoad 的值改为 true ，让这个传值只执行一次
        }
      },
    }
  }
</script>

<style scoped>

</style>
