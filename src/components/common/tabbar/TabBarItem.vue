<template>

    <div class="tab-bar-item" @click="itemClick">
      <!-- 使用 div 包裹着 插槽，以防 属性 被 插槽 替换掉 -->
      <div v-if="!isActive">
        <slot name="item-icom" ></slot>
      </div>
      <div v-else>
        <slot name="item-icom-active" ></slot>
      </div>

      <div :style="activeStyle">
        <slot name="item-text" ></slot>
      </div>

    </div>


</template>

<script>
  export default {
    name:"TabBarItem",
    props:{
      path:String,
      activeColor:{
        type:String,
        default:'red'
      }
    },
    data() {
      return {
        // isActive:true

      }
    },
    // 计算属性
    computed:{

      // TabBarItem 的动态图片控制
      isActive(){
        // /home -> item1(/home) = true
        // /home -> item1(/category) = false
        // /home -> item1(/cart) = false
        // /home -> item1(/profile) = false
        console.log(this.$route.path,this.path);
        return this.$route.path.indexOf(this.path) !== -1
        // this.$route.path 是获取当前路由地址


      },
      // TabBarItem 的动态文字颜色控制
      activeStyle(){
        return this.isActive ? {color:this.activeColor} : {}
      }
    },
    methods:{
      itemClick() {
        console.log(this.$route.path,this.isActive);
        this.$router.replace(this.path)
      }
    }
  }
</script>

<style>
  .tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  .tab-bar-item img{
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle; /* 去掉图片默认的外边距 */
    margin-bottom: 2px;

  }
/*  .active{
    color: #0000FF;
  } */
</style>
