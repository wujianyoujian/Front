<script setup lang="ts">
</script>

<template>
  <div class="home">
    <h2>首页 Home</h2>
    <p>这是 / 路由对应的页面</p>
    <router-link to="/about">跳转到 About</router-link>
  </div>
</template>

<style scoped>
.home {
  padding: 16px;
}
</style>
