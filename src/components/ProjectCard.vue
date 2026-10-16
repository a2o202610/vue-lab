<template>
  <!-- el-card 卡片组件（实验四重构：内部改用 Element Plus，插槽API保持不变） -->
  <el-card shadow="hover" class="project-card" :class="statusClass">
    <template #header>
      <div class="card-header">
        <!-- 具名插槽 #header：父组件可自定义标题 -->
        <slot name="header">
          <h3>{{ project.name }}</h3>
        </slot>
      </div>
    </template>

    <div class="card-body">
      <!-- 默认插槽：卡片主体内容 -->
      <slot>
        <p>{{ project.desc }}</p>
      </slot>
    </div>

    <div class="card-tags">
      <!-- 作用域插槽 #tags：把 item/index 暴露给父组件 -->
      <slot name="tags" :item="project" :index="index">
        <el-tag size="small">{{ project.status }}</el-tag>
      </slot>
    </div>

    <div class="card-footer">
      <slot name="actions" :item="project">
        <el-button size="small" type="success">查看详情</el-button>
      </slot>
    </div>
  </el-card>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  project: { type: Object, required: true },
  index: { type: Number, default: 0 }
})

const statusClass = computed(() => {
  const map = { '已完成': 'status-done', '开发中': 'status-doing', '规划中': 'status-plan' }
  return map[props.project?.status] || ''
})
</script>

<style scoped>
.project-card { margin-bottom: 20px; }
.project-card.status-done { border-top: 3px solid var(--el-color-success); }
.project-card.status-doing { border-top: 3px solid var(--el-color-warning); }
.project-card.status-plan { border-top: 3px solid var(--el-color-info); }
.card-header h3 { margin: 0; color: var(--el-text-color-primary); }
.card-body { color: var(--el-text-color-regular); }
.card-tags { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px; }
.card-footer { display: flex; justify-content: flex-end; }
</style>
