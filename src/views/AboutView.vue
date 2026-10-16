<template>
  <div class="about-view">
    <h2>关于我</h2>

    <!-- el-descriptions 描述列表组件展示信息 -->
    <el-card shadow="hover">
      <el-descriptions :column="1" border>
        <el-descriptions-item label="姓名">{{ info.name }}</el-descriptions-item>
        <el-descriptions-item label="班级">{{ info.className }}</el-descriptions-item>
        <el-descriptions-item label="简介">{{ info.desc }}</el-descriptions-item>
      </el-descriptions>
    </el-card>

    <h3>技术栈（{{ profileStore.skillCount }} 项）</h3>
    <div class="skill-tags">
      <el-tag v-for="s in skillList" :key="s" size="large" effect="dark">{{ s }}</el-tag>
    </div>

    <h3>项目概览（{{ projectsStore.projectCount }} 个）</h3>
    <ul class="project-summary">
      <li v-for="p in projectsStore.projects" :key="p.id">
        <RouterLink :to="{ name: 'project-detail', params: { id: p.id } }">
          {{ p.name }}
        </RouterLink>
        <el-tag size="small" style="margin-left:8px">{{ p.status }}</el-tag>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useProfileStore } from '../stores/profile'
import { useProjectsStore } from '../stores/projects'

// storeToRefs 解构保持响应式
const profileStore = useProfileStore()
const { info, skillList } = storeToRefs(profileStore)
const projectsStore = useProjectsStore()
</script>

<style scoped>
.about-view { padding: 24px; max-width: 800px; margin: 0 auto; width: 100%; }
.about-view h2 { color: var(--el-text-color-primary); margin-bottom: 16px; }
.about-view h3 { color: var(--el-text-color-primary); margin: 22px 0 12px; }
.skill-tags { display: flex; gap: 10px; flex-wrap: wrap; }
.project-summary { list-style: none; padding: 0; }
.project-summary li { margin: 10px 0; }
.project-summary a { color: var(--el-color-primary); text-decoration: none; }
.project-summary a:hover { text-decoration: underline; }
</style>
