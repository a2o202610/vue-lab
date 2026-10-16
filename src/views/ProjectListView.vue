<template>
  <div class="project-list">
    <p class="sub">共 {{ projectsStore.projectCount }} 个项目，已完成 {{ projectsStore.doneCount }} 个（数据来自 Pinia Store）</p>

    <el-row :gutter="20">
      <el-col v-for="(p, i) in projectsStore.projects" :key="p.id" :span="8">
        <ProjectCard :project="p" :index="i">
          <template #header>
            <span class="p-title">{{ p.name }}</span>
          </template>

          <p class="p-desc">{{ p.desc }}</p>

          <template #tags="{ item }">
            <el-tag :type="statusType(item.status)" size="small">{{ item.status }}</el-tag>
            <el-tag v-for="t in item.tech" :key="t" size="small" type="info" effect="plain">{{ t }}</el-tag>
          </template>

          <template #actions="{ item }">
            <el-button size="small" type="success" @click="goDetail(item.id)">查看详情</el-button>
          </template>
        </ProjectCard>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useProjectsStore } from '../stores/projects'
import ProjectCard from '../components/ProjectCard.vue'

const projectsStore = useProjectsStore()
const router = useRouter()

const statusType = (s) => ({ '已完成': 'success', '开发中': 'warning', '规划中': 'info' }[s] || 'info')

// 编程式导航：push 跳转到动态路由详情页
const goDetail = (id) => {
  router.push({ name: 'project-detail', params: { id } })
}
</script>

<style scoped>
.project-list { padding: 8px 0; }
.sub { text-align: center; color: var(--el-text-color-secondary); margin-bottom: 20px; }
.p-title { font-weight: bold; }
.p-desc { color: var(--el-text-color-regular); min-height: 42px; }
</style>
