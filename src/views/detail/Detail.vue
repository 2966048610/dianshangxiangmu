<template>
  <div id="">
    <!-- 详情页{{iid}} -->
    <detail-nav-bar></detail-nav-bar>

    <detail-swiper :top-images='topImages'></detail-swiper>



  </div>
</template>

<script>

  import {getDetail, Goods} from 'network/datail'

  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'

export default {
  name:'Detail',

  components: {
    DetailNavBar,
    DetailSwiper,
  },


  data() {
    return {
      // 接收上个页面传来的值
      iid: null,

      // 获取顶部的图片轮播数据
      topImages:[],

      // 接收商品详情的数据
      goods:null,


    }
  },

  created() {
    // 获取传进来的数据 this.$route.params
    console.log(this.$route.params);
    console.log(this.$route.params.id);
    // 保存传入的id
    if(this.$route.params.id){
      this.iid = this.$route.params.id
    }

    // 调用getDetail发起请求
    this.getDetail()

  },

  methods:{

    getDetail(){
      // 根据iid请求详情数据
      getDetail(this.iid).then(res => {
        console.log(res);

        // 获取顶部的图片轮播数据
        this.topImages = res.result.itemInfo.topImages
        // 把 res.result 赋值 给 data
        const data = res.result;

        // new 一个对象Goods,传入三个参数，传入对应的参数
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

        console.log(this.goods);


      })
    }


  },

  // 页面销毁时执行
  destroyed() {
    console.log('组件销毁了');
  }



}




</script>

<style>

</style>
