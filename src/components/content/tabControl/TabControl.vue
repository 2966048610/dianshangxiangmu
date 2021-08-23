<template>
  <div class="tab-control">
    <div class="tab-control-item" v-for="(item,index) in titles" :key="index" :class="{active: index === currentIndex}" @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    props:{
      titles:{
        type:Array,
        default() {
          return []
        }
      }
    },

    data() {
      return {
        currentIndex: 0
      }
    },

    methods:{
      itemClick(index){
        this.currentIndex = index ;
        this.$emit('tabClick',index) // 监听点击时间，并使用 $emit() 传递到首页home
      }
    }

  }

</script>

<style>

  .tab-control{
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
    z-index: 100;
  }
  .tab-control-item{
    flex: 1;
  }
  .tab-control-item span{
    padding: 5px;
  }
  .active{
    color: var(--color-high-text);
  }
  .active span{
    border-bottom: 3px solid var(--color-tint);
  }

</style>
