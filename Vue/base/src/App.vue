<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import Child from './Child.vue';

const count = ref({
  userName: 'nio wang',
  count: 1
})


const childRef = ref()

const isBool = ref(true);

const formValues =  reactive({});

function increase() {
  count.value.count++;
}
function handleUpdate(userName: string) {
  count.value.userName = userName
}

onMounted(() => {
  console.log(112)
})

</script>

<template>
  <!-- 路由导航 -->
  <nav class="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
  </nav>

  <!-- 路由出口：匹配到的组件渲染在这里 -->
  <router-view />

  <!-- <h2>parent</h2>
  <div class="increaseAdd" @click="increase">{{ count.count }}</div>
  <div>{{ count.userName }}</div>

  <button @click="() => isBool= !isBool">切换</button>

  <h2>child</h2>
  <Child ref="childRef" v-if="isBool" :name="count.userName" @update="handleUpdate"></Child>
  <button @click="() => console.log(console.log(childRef))">测试</button> -->
</template>

<style scoped>
.nav {
  display: flex;
  gap: 12px;
  padding: 12px;
  background: #f5f5f5;
}

.nav a {
  text-decoration: none;
  color: #333;
}

.nav a.router-link-active {
  color: #42b883;
  font-weight: bold;
}

.increaseAdd {
  color: #f00;
}
</style>
