<template>
  <div id="app">
    <router-view />
    <div>
      <van-tabbar v-model="active">
        <van-tabbar-item name="home" icon="home-o"  replace to="/">首页</van-tabbar-item>
        <van-tabbar-item name="search" icon="search"   replace to="/classIty">分类</van-tabbar-item>
        <van-tabbar-item name="friends" icon="friends-o"   replace to="/shopCart">购物车</van-tabbar-item>
        <van-tabbar-item name="setting" icon="setting-o"   replace to="/mine">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      active: "home"
    };
  }
};
</script>
<style>
</style>
