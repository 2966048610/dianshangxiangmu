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
    data() {
      return {
        scroll: null
      }
    },
    mounted() {

      this.scroll = new BScroll(this.$refs.wrapper,{
        click:true,
        observeDOM:true
      })
      console.log(this.$refs.wrapper);
    },

    methods:{
      scrollTo(x,y,time=300) {
        this.scroll.scrollTo(x,y,time)
      }
    }

  }



</script>

<style>
</style>
