<template>
  <div class="not-found">
    <!-- el-empty 空状态组件 -->
    <el-empty description="404 · 页面未找到">
      <p class="path">您访问的路径：{{ $route.path }}</p>
      <el-button type="primary" @click="$router.push({ name: 'home' })">返回首页</el-button>
    </el-empty>
  </div>
</template>

<script setup>
</script>

<style scoped>
.not-found {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px;
}
.path { font-size: 0.9rem; color: var(--el-text-color-secondary); margin-bottom: 16px; }
</style>
