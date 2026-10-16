<template>
  <el-container class="app">
    <!-- 顶部：el-menu 导航 + 用户Store登录状态 -->
    <el-header class="app-header" height="auto">
      <Header :is-dark="isDark" @toggle-dark="toggleDark" />
    </el-header>

    <!-- 路由出口：匹配的页面组件渲染在这里 -->
    <el-main class="app-main">
      <RouterView />
    </el-main>

    <el-footer class="app-footer" height="auto">
      <Footer :copyright="copyText" />
    </el-footer>
  </el-container>
</template>

<script setup>
import { ref, watch } from 'vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

const copyText = ref('©2026 Vue状态管理与UI组件实验')
const isDark = ref(false)

const toggleDark = () => {
  isDark.value = !isDark.value
}

// 暗色模式同步到 html 元素，让 Element Plus 组件一起切换
watch(isDark, (v) => {
  document.documentElement.classList.toggle('dark', v)
}, { immediate: true })
</script>

<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: "Microsoft YaHei", sans-serif; }
.app { min-height: 100vh; }
.app-header { padding: 0; }
.app-main {
  background: var(--el-bg-color-page);
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 120px);
}
.app-footer { padding: 0; }
</style>
