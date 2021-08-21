<template>
  <div id="app">
    <!-- 底部导航栏 组件 -->
    <main-tab-bar></main-tab-bar>
    <router-view></router-view>

  </div>
</template>

<script>

import MainTabBar from 'components/content/MainTabBar/MainTabBar'

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
