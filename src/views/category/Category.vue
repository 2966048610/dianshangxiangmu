<template>
  <div id="">
    <h1>分类</h1>
    <div class="wrapper">

      <ul class="center">
        <li v-for="(item,index) in aa" :key="index">{{item}}</li>

      </ul>

    </div>
  </div>

</template>

<script>

  import BScroll from 'better-scroll'


	export default{
    data() {
      return {
        aa: [],
        scroll:null
      }
    },
    created() {
      this.aaa()

    },
		methods:{
			aaa(){
				for (var i = 0; i < 30; i++) {
					// console.log(i);
          this.aa = i
				}
			},



		},

    // 组件创建完成后调用
    mounted(){
      // 默认情况下 BScroll 是不可以实时的监听滚动位置
      // probe :侦测  ； 0 和 1 都是不侦测实时的位置  ； 2：在手指滚动的过程中侦测，手指离开后的惯性滚动过程不侦测 ； 3：只要是滚动，都侦测

      this.scroll = new BScroll(document.querySelector(".wrapper"),{
        probeType:3,  // 监听滚动
        // click:true,   // 允许点击
        pullUpLoad:true  // 上拉加载
      }),

      // console.log(document.querySelector(".wrapper"));
      // 检测滚动
      this.scroll.on('scroll',(position) => {
        console.log(position);
      })

      this.scroll.on('pullingUp',() => {
        console.log(1);
        // 先发送网络请求，请求更多页的数据

        // 等数据请求完成，并且将新的数据展示出来后
        setTimeout(() => {
          this.scroll.finishPullUp()  // 使上拉加载功能继续使用
        },2000)

      })


    }
	}
</script>

<!-- scoped 规定样式作用域 ， 只对本页面起效果 -->
<style scoped>
  .wrapper{
    width: 100%;
    height: 150px;
    background-color: red;

    /* overflow: hidden; */
    /* overflow-y: scroll; */
  }
</style>
