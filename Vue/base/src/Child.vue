<script setup lang="ts">
import { computed, ref, watch } from 'vue';

const props = defineProps({
  name: String
})

const emit = defineEmits(['update'])
const inputValue = ref('')

watch(inputValue, (val, oldVal) => {
  console.log(val)
})

const newName = computed(() => (props.name || '') + 1)

</script>

<template>

  <div class="child">{{ name }}</div>
  <input v-model="inputValue" type="text">
</template>

<style scoped>
.child {
  color: #f00;
}
</style>
