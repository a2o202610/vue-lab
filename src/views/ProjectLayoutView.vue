<template>
  <div class="project-layout">
    <h2 class="layout-title">项目中心</h2>
    <p class="layout-desc">在这里浏览我所有的项目</p>

    <!-- 子路由出口：ProjectListView / ProjectDetailView 会渲染在这里 -->
    <RouterView />
  </div>
</template>

<script setup>
</script>

<style scoped>
.project-layout {
  flex: 1;
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}
.layout-title { text-align: center; color: #2c3e50; margin-bottom: 8px; }
.layout-desc { text-align: center; color: #7f8c8d; margin-bottom: 24px; }
</style>
