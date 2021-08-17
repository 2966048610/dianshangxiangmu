<template>
  <div id="app">
  <div><h1>测试git能不能改</h1></div>
    <!-- 底部导航栏 组件 -->
    <main-tab-bar></main-tab-bar>
    <router-view></router-view>

  </div>
</template>

<script>

import MainTabBar from '@/components/content/MainTabBar.vue'

export default {
  name: 'App',
  components: {

    MainTabBar
  }
}
</script>

<style>

@import url("assets/css/base.css");




</style>
