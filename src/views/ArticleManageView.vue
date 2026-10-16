<template>
  <div class="article-manage">
    <div class="head">
      <h3>文章管理</h3>
      <el-button type="primary" @click="openDialog()">新增文章</el-button>
    </div>

    <!-- el-table 表格组件展示文章数据（增删改查核心） -->
    <el-table :data="articleStore.articles" stripe border>
      <el-table-column prop="id" label="编号" width="70" />
      <el-table-column prop="title" label="标题" min-width="180" />
      <el-table-column prop="category" label="分类" width="100">
        <template #default="{ row }">
          <el-tag size="small">{{ row.category }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="日期" width="120" />
      <el-table-column prop="summary" label="摘要" min-width="200" show-overflow-tooltip />
      <el-table-column label="操作" width="150" fixed="right">
        <template #default="{ row }">
          <el-button size="small" type="primary" plain @click="openDialog(row)">编辑</el-button>
          <el-button size="small" type="danger" plain @click="handleRemove(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- el-dialog 对话框 + el-form 表单：新增/编辑文章 -->
    <el-dialog v-model="dialogVisible" :title="editingId ? '编辑文章' : '新增文章'" width="520px">
      <el-form :model="form" label-width="60px">
        <el-form-item label="标题">
          <el-input v-model="form.title" placeholder="请输入文章标题" />
        </el-form-item>
        <el-form-item label="分类">
          <el-select v-model="form.category" placeholder="选择分类" style="width:100%">
            <el-option v-for="c in allCategories" :key="c" :label="c" :value="c" />
            <el-option label="前端" value="前端" />
            <el-option label="学习" value="学习" />
            <el-option label="生活" value="生活" />
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker v-model="form.date" type="date" value-format="YYYY-MM-DD" style="width:100%" />
        </el-form-item>
        <el-form-item label="摘要">
          <el-input v-model="form.summary" type="textarea" :rows="3" placeholder="请输入文章摘要" />
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
import { useArticlesStore } from '../stores/articles'

const articleStore = useArticlesStore()

// 对话框与表单状态
const dialogVisible = ref(false)
const editingId = ref(null)
const form = reactive({ title: '', category: '', date: '', summary: '' })
const allCategories = articleStore.categories

// 打开对话框（无参=新增，传文章=编辑）
const openDialog = (row) => {
  editingId.value = row ? row.id : null
  if (row) {
    Object.assign(form, row)
  } else {
    Object.assign(form, { title: '', category: '前端', date: new Date().toISOString().slice(0, 10), summary: '' })
  }
  dialogVisible.value = true
}

// 保存：调用 Store 的 action 增/改，并持久化到 localStorage
const handleSave = () => {
  if (!form.title.trim()) {
    ElMessage.warning('请输入文章标题')
    return
  }
  if (editingId.value) {
    articleStore.updateArticle(editingId.value, { ...form })
    ElMessage.success('文章已更新')
  } else {
    articleStore.addArticle({ ...form })
    ElMessage.success('文章已新增')
  }
  dialogVisible.value = false
}

// 删除：ElMessageBox 确认框 + Store action
const handleRemove = (row) => {
  ElMessageBox.confirm(`确定删除文章「${row.title}」吗？`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    articleStore.removeArticle(row.id)
    ElMessage.success('删除成功')
  }).catch(() => {})
}
</script>

<style scoped>
.article-manage { padding: 8px 0; }
.head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.head h3 { color: #2c3e50; }
</style>
