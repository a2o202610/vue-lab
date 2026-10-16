<template>
  <div class="home-view">
    <!-- 个人信息页：数据来自 profile Store（跨页面共享） -->
    <MainPage />
  </div>
</template>

<script setup>
import MainPage from '../components/MainPage.vue'
</script>

<style scoped>
.home-view { flex: 1; display: flex; flex-direction: column; width: 100%; }
</style>
