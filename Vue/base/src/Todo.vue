<template>
  <div class="todoWrapper">
    <div>
      <input v-model="inputValue" type="text">
      <button @click="addHandle">add</button>
    </div>
    <div v-for="todo in todoList">
      <span>{{ todo.content }}</span>
      <button @click="() => deleteHandle(todo.id)">删除</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const inputValue = ref<string | undefined>()
const todoList = reactive<{id: string | number, content: string | undefined}[]>([])

const deleteHandle = (id: string) => {
  const curIdx = todoList.findIndex(item => item.id == id)
  todoList.splice(curIdx, 1)
}
const addHandle = () => {
  if (!inputValue) return
  todoList.push({id: Date.now(), content: inputValue.value})
  inputValue.value = undefined
}

</script>
<style>
</style>
