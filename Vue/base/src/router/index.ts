import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'

const router = createRouter({
  // 使用 history 模式（URL 干净，无 #）
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      // 路由懒加载：访问时才加载组件，减小首屏体积
      component: About,
    },
  ],
})

export default router
