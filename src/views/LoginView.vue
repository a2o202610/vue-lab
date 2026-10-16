<template>
  <div class="login-view">
    <!-- el-card 卡片 + el-form 表单组件 -->
    <el-card class="login-card" shadow="always">
      <template #header><h2 class="login-title">身份认证</h2></template>
      <p class="hint">请登录后进入后台管理页面（admin / 123456）</p>

      <!-- el-alert 提示组件显示错误信息 -->
      <el-alert v-if="errorMsg" :title="errorMsg" type="error" show-icon :closable="false" style="margin-bottom:14px" />

      <el-form :model="form" label-width="60px" @submit.prevent>
        <el-form-item label="用户名">
          <el-input v-model="form.username" placeholder="请输入用户名" @keyup.enter="handleLogin" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password" show-password placeholder="请输入密码" @keyup.enter="handleLogin" />
        </el-form-item>
        <el-form-item>
          <!-- el-button 按钮：登录调用用户 Store 的 action -->
          <el-button type="primary" class="w100" @click="handleLogin">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-button class="w100" @click="goBack">返回</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useUserStore } from '../stores/user'

const route = useRoute()
const router = useRouter()
// 登录逻辑全部委托给用户 Store 的 action（状态跨页面共享）
const userStore = useUserStore()

const form = reactive({ username: '', password: '' })
const errorMsg = ref('')

// 编程式导航：登录成功后 replace 跳转到原目标页
const handleLogin = () => {
  if (userStore.login(form.username, form.password)) {
    errorMsg.value = ''
    ElMessage.success(userStore.welcomeMsg)
    const redirect = route.query.redirect || '/admin'
    router.replace(redirect)
  } else {
    errorMsg.value = '用户名或密码错误（提示：admin / 123456）'
  }
}

// 编程式导航：go(-1) 返回上一页
const goBack = () => {
  router.go(-1)
}
</script>

<style scoped>
.login-view { flex: 1; display: flex; justify-content: center; align-items: center; padding: 40px; }
.login-card { width: 380px; }
.login-title { text-align: center; color: var(--el-text-color-primary); }
.hint { text-align: center; color: var(--el-text-color-secondary); margin-bottom: 18px; font-size: 13px; }
.w100 { width: 100%; }
</style>
