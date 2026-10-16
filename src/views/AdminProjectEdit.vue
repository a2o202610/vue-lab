<template>
  <div class="project-edit">
    <div class="head">
      <!-- getters：项目统计来自项目 Store -->
      <h3>编辑项目信息（共 {{ projectsStore.projectCount }} 个，已完成 {{ projectsStore.doneCount }} 个）</h3>
      <el-button type="primary" @click="openDialog()">新增项目</el-button>
    </div>

    <!-- el-table 表格组件：项目增删改查 -->
    <el-table :data="projectsStore.projects" stripe border>
      <el-table-column prop="id" label="编号" width="70" />
      <el-table-column prop="name" label="项目名称" min-width="120" />
      <el-table-column prop="desc" label="描述" min-width="180" show-overflow-tooltip />
      <el-table-column prop="status" label="状态" width="100">
        <template #default="{ row }">
          <el-tag :type="statusType(row.status)" size="small">{{ row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" fixed="right">
        <template #default="{ row }">
          <el-button size="small" type="primary" plain @click="openDialog(row)">编辑</el-button>
          <el-button size="small" type="danger" plain @click="handleRemove(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- el-dialog + el-form：新增/编辑项目 -->
    <el-dialog v-model="dialogVisible" :title="editingId ? '编辑项目' : '新增项目'" width="480px">
      <el-form :model="form" label-width="70px">
        <el-form-item label="名称">
          <el-input v-model="form.name" placeholder="请输入项目名称" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.desc" type="textarea" :rows="2" placeholder="请输入项目描述" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="form.status" style="width:100%">
            <el-option label="已完成" value="已完成" />
            <el-option label="开发中" value="开发中" />
            <el-option label="规划中" value="规划中" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useProjectsStore } from '../stores/projects'

const projectsStore = useProjectsStore()

const dialogVisible = ref(false)
const editingId = ref(null)
const form = reactive({ name: '', desc: '', status: '规划中' })

const statusType = (s) => ({ '已完成': 'success', '开发中': 'warning', '规划中': 'info' }[s] || 'info')

const openDialog = (row) => {
  editingId.value = row ? row.id : null
  if (row) Object.assign(form, row)
  else Object.assign(form, { name: '', desc: '', status: '规划中' })
  dialogVisible.value = true
}

// 调用 Store action 增/改并持久化
const handleSave = () => {
  if (!form.name.trim()) {
    ElMessage.warning('请输入项目名称')
    return
  }
  if (editingId.value) {
    projectsStore.updateProject(editingId.value, { ...form })
    ElMessage.success('项目已更新')
  } else {
    projectsStore.addProject({ ...form })
    ElMessage.success('项目已新增')
  }
  dialogVisible.value = false
}

const handleRemove = (row) => {
  ElMessageBox.confirm(`确定删除项目「${row.name}」吗？`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    projectsStore.removeProject(row.id)
    ElMessage.success('删除成功')
  }).catch(() => {})
}
</script>

<style scoped>
.project-edit { padding: 8px 0; }
.head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; gap: 12px; flex-wrap: wrap; }
.head h3 { color: var(--el-text-color-primary); font-size: 16px; }
</style>
