<template>
  <div>
    <van-nav-bar :title="$route.meta.title" />
    <div style="margin-bottom: 48px"><router-view></router-view></div>
    <van-tabbar>
      <van-tabbar-item icon="home-o" @click="btn('/layout/home')"
        >主页</van-tabbar-item
      >
      <van-tabbar-item icon="search" @click="btn('/layout/search')"
        >搜索</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "AA",
  methods: {
    btn(a) {
      this.$router.push({
        path: a,
      });
    },
  },
};
</script>

<style>
/* 中间内容区域 - 容器样式(留好上下导航所占位置) */
.main {
  padding-top: 46px;
  padding-bottom: 50px;
}
</style>
