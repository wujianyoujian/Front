<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// 编程式导航：返回上一页
function goBack() {
  router.back()
}
</script>

<template>
  <div class="about">
    <h2>关于 About</h2>
    <p>这是 /about 路由对应的页面</p>
    <p>当前路径：{{ route.path }}</p>
    <router-link to="/">跳转到首页</router-link>
    <button @click="goBack">返回上一页</button>
  </div>
</template>

<style scoped>
.about {
  padding: 16px;
}
</style>
