<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const dialogVisible = ref(false)

function openMessage() {
  ElMessage.success('Element Plus message —— 检查它有没有样式')
}
</script>

<template>
  <div class="app">
    <h3>Vue + Element Plus 子应用</h3>

    <el-button type="primary" @click="openMessage">打开 Message（Portal）</el-button>
    <el-button @click="dialogVisible = true">打开 Dialog（Portal）</el-button>

    <br /><br />
    <el-input placeholder="输入框（观察全局样式）" style="width: 260px" />
    <el-select placeholder="下拉框" style="width: 160px; margin-top: 12px">
      <el-option label="选项一" value="1" />
      <el-option label="选项二" value="2" />
    </el-select>

    <el-dialog v-model="dialogVisible" title="测试弹窗">
      <p>弹窗内容 —— strictStyleIsolation 下默认会裸奔，靠 patch 修复</p>
    </el-dialog>
  </div>
</template>

<style scoped>
.app {
  padding: 8px;
}
.app h3 {
  margin-top: 0;
}
</style>
