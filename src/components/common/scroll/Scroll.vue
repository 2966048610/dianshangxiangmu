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
		}
      }
    },
    mounted() {

      // 创建 BScroll 对象
      this.scroll = new BScroll(this.$refs.wrapper,{
        click:true,
        probeType: this.probeType , // 根据 使用者 输入的 值 来决定 是否 监听 ，怎么样的 监听 ，值：0,1,2,3
        observeDOM:true , // 实时监听 DOM
        pullUpLoad:this.pullUpLoad
      })
      // console.log(this.$refs.wrapper);

      // 监听滚动的位置
      this.scroll.on('scroll',(position) => {
        // console.log(position);
        this.$emit('scroll',position)
      })

      // 监听 上拉 事件
      this.scroll.on('pullingUp', () => {
        console.log('上拉*****************');
        this.$emit('pullingUp')
      })




    },

    methods:{
      scrollTo(x,y,time=300) {
        this.scroll.scrollTo(x,y,time)
      },

      finishPullUp() {
        this.scroll.finishPullUp()
      },

      refresh() {
        this.scroll.refresh()
      }

    }

  }



</script>

<style>
</style>
