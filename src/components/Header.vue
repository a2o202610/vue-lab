<template>
  <div class="header">
    <div class="header-left">
      <h2>我的个人主页</h2>
      <p class="owner">孙敏洁 · 249980832 · 24计科2班</p>
    </div>

    <!-- el-menu 水平菜单组件：router 模式直接按 index 跳转，自动导航高亮 -->
    <el-menu
      :default-active="activeIndex"
      mode="horizontal"
      router
      :ellipsis="false"
      class="header-menu"
    >
      <el-menu-item index="/home">首页</el-menu-item>
      <el-menu-item index="/article">文章</el-menu-item>
      <el-menu-item index="/project">项目中心</el-menu-item>
      <el-menu-item index="/about">关于</el-menu-item>
    </el-menu>

    <div class="header-right">
      <!-- getters 演示：欢迎语来自用户 Store 的 welcomeMsg -->
      <span v-if="userStore.isLoggedIn" class="welcome">{{ userStore.welcomeMsg }}</span>

      <el-button circle @click="emit('toggle-dark')">{{ isDark ? '☀' : '☾' }}</el-button>

      <!-- 登录状态来自用户 Store（跨组件共享） -->
      <el-button v-if="!userStore.isLoggedIn" type="success" @click="goLogin">登录</el-button>
      <el-button v-else type="warning" @click="goAdmin">后台管理</el-button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useUserStore } from '../stores/user'

defineProps({
  isDark: { type: Boolean, default: false }
})
const emit = defineEmits(['toggle-dark'])

const route = useRoute()
const router = useRouter()
// storeToRefs 解构 Store 保持响应式（actions 直接从实例解构即可）
const userStore = useUserStore()
const { isLoggedIn } = storeToRefs(userStore)

// 计算菜单高亮项：详情页等子路径归到父级菜单
const activeIndex = computed(() => {
  if (route.path.startsWith('/project')) return '/project'
  if (route.path.startsWith('/article')) return '/article'
  if (route.path.startsWith('/admin')) return '/home'
  return route.path
})

// 编程式导航
const goLogin = () => router.push({ name: 'login' })
const goAdmin = () => router.push({ name: 'admin' })
</script>

<style scoped>
.header {
  background: var(--el-bg-color);
  padding: 10px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  box-shadow: var(--el-box-shadow-light);
}
.header-left h2 { font-size: 1.15rem; color: var(--el-text-color-primary); }
.owner { font-size: 12px; color: var(--el-text-color-secondary); }
.header-menu { border-bottom: none; flex: 1; margin: 0 20px; min-width: 320px; }
.header-right { display: flex; align-items: center; gap: 10px; }
.welcome { font-size: 13px; color: var(--el-color-success); }
</style>
