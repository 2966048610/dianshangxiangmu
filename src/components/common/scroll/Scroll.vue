<template>
  <!-- ref/children 绑定到子组件上 -->
  <div class="wrapper" ref="wrapper" >
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>

  import BScroll from 'better-scroll'


  export default {
    props:{

      probeType:{
        type:Number,
        default: 0
      },

    },
    data() {
      return {
        scroll: null,

        pullUpLoad:{
          type:Boolean, // 布尔类型
          default:false
        },

      }
    },
    mounted() {
      // 默认情况下 BScroll 是不可以实时的监听滚动位置
      // probe :侦测  ； 0 和 1 都是不侦测实时的位置  ； 2：在手指滚动的过程中侦测，手指离开后的惯性滚动过程不侦测 ； 3：只要是滚动，都侦测
      
      // 创建 BScroll 对象
      this.scroll = new BScroll(this.$refs.wrapper,{
        click:true,   // 允许点击
        probeType: this.probeType , // 根据 使用者 输入的 值 来决定 是否 监听 ，怎么样的 监听 ，值：0,1,2,3
        observeDOM:true , // 实时监听 DOM
        pullUpLoad:this.pullUpLoad   // 上拉加载
      })
      // console.log(this.$refs.wrapper);

      // 监听滚动的位置
      if(this.probeType === 2 || this.probeType === 3) {
        this.scroll.on('scroll',(position) => {
          // console.log(position);
          this.$emit('scroll',position)
        })
      }


      // 监听 上拉 事件
      if(this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          console.log('监听 scroll 滚动到底部');
          this.$emit('pullingUp')
        })
      }




    },

    methods:{
      // 获取当前 在 页面上的 位置 ， 这里用在了点击返回顶部 这个功能
      scrollTo(x,y,time=300) {
        // 逻辑判断 && ，严谨写法 ，this.scroll 有值 才执行下一步
        this.scroll && this.scroll.scrollTo(x,y,time)
      },

      // 上拉加载更多  的 继续调用
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },

      // 重新计算页面高度
      refresh() {
        this.scroll && this.scroll.refresh()
        console.log('执行 refresh() 函数；重新计算页面高度');
      },

      // 记录页面的位置，用于 页面重新进入时 回到 上次离开时的位置
      getScrollY() {
        return this.scroll ? this.scroll.y : 0
      }

    }

  }



</script>

<style>
</style>
