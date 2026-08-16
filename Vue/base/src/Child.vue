<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import Todo from './Todo.vue';

const props = defineProps({
  name: String
})


const emit = defineEmits(['update'])
const inputValue = ref('')


watch(inputValue, (val, oldVal) => {
  console.log(val)
})

const newName = computed(() => (inputValue.value + ' computed'))

const testHandle = () => {}
defineExpose({testHandle})
</script>

<template>
  <div class="child">{{ name }}</div>
  <div>11{{newName}}</div>
  <input v-model="inputValue" type="text">
  <button @click="$emit('update', inputValue)">更新</button>

  <Todo></Todo>
</template>

<style scoped>
.child {
  color: #f00;
}
</style>
