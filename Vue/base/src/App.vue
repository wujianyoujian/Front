<script setup lang="ts">
import { ref } from 'vue';
import Child from './Child.vue';

const count = ref({
  userName: 'nio wang',
  count: 1
})

function increase() {
  count.value.count++;
}
function handleUpdate(userName: string) {
  count.value.userName = userName
}
</script>

<template>
  <div @click="increase">{{ count.count }}</div>
  <Child :name="count.userName" @update="handleUpdate"></Child>
</template>
