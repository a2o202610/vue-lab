<template>
  <div class="admin-layout">
    <div class="admin-head">
      <div>
        <h2>后台管理</h2>
        <!-- getters：欢迎语来自用户 Store -->
        <p class="welcome">{{ userStore.welcomeMsg }}</p>
      </div>
      <!-- 退出登录调用用户 Store 的 action -->
      <el-button type="danger" plain @click="logout">退出登录</el-button>
    </div>

    <div class="admin-body">
      <!-- el-menu 垂直菜单：router 模式导航 + 高亮 -->
      <el-menu :default-active="route.path" router class="admin-menu">
        <el-menu-item index="/admin/profile">编辑个人简介</el-menu-item>
        <el-menu-item index="/admin/project">编辑项目信息</el-menu-item>
        <el-menu-item index="/admin/article">文章管理</el-menu-item>
      </el-menu>

      <!-- 子路由出口 -->
      <div class="admin-content">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useUserStore } from '../stores/user'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

// 退出登录：调用 Store action 清空状态并持久化，replace 回首页
const logout = () => {
  userStore.logout()
  ElMessage.success('已退出登录')
  router.replace({ name: 'home' })
}
</script>

<style scoped>
.admin-layout { padding: 24px; max-width: 950px; margin: 0 auto; width: 100%; }
.admin-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.admin-head h2 { color: var(--el-text-color-primary); }
.welcome { color: var(--el-color-success); font-size: 13px; margin-top: 4px; }
.admin-body { display: flex; gap: 20px; align-items: flex-start; }
.admin-menu { width: 180px; flex-shrink: 0; }
.admin-content {
  flex: 1;
  background: var(--el-bg-color);
  padding: 20px;
  border-radius: 8px;
  box-shadow: var(--el-box-shadow-light);
}
</style>
