<script setup lang="ts">
</script>

<template>
  <div class="host">
    <h1>qiankun 全局样式冲突复现</h1>
    <p class="tip">
      请先启动两个子应用：<code>vue-app</code>(7101) 和 <code>react-app</code>(7102)。<br />
      修改 <code>src/qiankun.ts</code> 里的 <code>STRICT_MODE</code> 为 <code>true/false</code> 后刷新本页，
      对比两种模式下的表现。
    </p>
    <div class="grid">
      <section class="panel">
        <h2>Vue + Element Plus</h2>
        <div id="vue-container"></div>
      </section>
      <section class="panel">
        <h2>React + Ant Design</h2>
        <div id="react-container"></div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.host {
  padding: 16px;
  font-family: Arial, sans-serif;
}
.tip {
  background: #fff7e6;
  border: 1px solid #ffd591;
  padding: 10px 14px;
  border-radius: 6px;
  color: #8c5a00;
}
.tip code {
  background: #ffe7ba;
  padding: 1px 5px;
  border-radius: 3px;
}
.grid {
  display: flex;
  gap: 16px;
  margin-top: 16px;
}
.panel {
  flex: 1;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  min-height: 320px;
}
.panel h2 {
  margin-top: 0;
  border-bottom: 1px solid #eee;
  padding-bottom: 8px;
}
</style>
