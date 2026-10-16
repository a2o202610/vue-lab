<template>
  <div class="profile-edit">
    <h3>编辑个人简介</h3>

    <!-- el-form + el-input 表单组件：直接编辑 Store 中的响应式数据 -->
    <el-form :model="form" label-width="70px">
      <el-form-item label="姓名">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="班级">
        <el-input v-model="form.className" />
      </el-form-item>
      <el-form-item label="简介">
        <el-input v-model="form.desc" type="textarea" :rows="3" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { storeToRefs } from 'pinia'
import { useProfileStore } from '../stores/profile'

const router = useRouter()
const profileStore = useProfileStore()
// storeToRefs 解构出响应式 state
const { info } = storeToRefs(profileStore)

// 拷贝一份到本地表单，保存时才写回 Store
const form = reactive({
  name: info.value.name,
  className: info.value.className,
  desc: info.value.desc
})

// 保存：调用 profile Store 的 action（内部同步 localStorage 持久化）
const save = () => {
  profileStore.updateInfo({ ...form })
  ElMessage.success('保存成功，刷新页面数据也不会丢失')
}

const cancel = () => {
  router.go(-1)
}
</script>

<style scoped>
.profile-edit h3 { color: var(--el-text-color-primary); margin-bottom: 20px; }
</style>
