<template>
  <div class="project-detail" v-if="project">
    <el-button class="back" @click="goBack">← 返回列表</el-button>

    <!-- el-descriptions 描述列表 + el-tag：动态路由 :id 配合 Store getter getById -->
    <el-card shadow="hover">
      <template #header><h2 class="p-name">{{ project.name }}</h2></template>
      <el-descriptions :column="1" border>
        <el-descriptions-item label="项目编号">{{ project.id }}</el-descriptions-item>
        <el-descriptions-item label="项目状态">
          <el-tag :type="statusType(project.status)">{{ project.status }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="技术栈">
          <el-tag v-for="t in project.tech" :key="t" size="small" type="info" style="margin-right:6px">{{ t }}</el-tag>
          <span v-if="!project.tech || project.tech.length === 0" class="none">暂无</span>
        </el-descriptions-item>
        <el-descriptions-item label="项目描述">{{ project.desc }}</el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>

  <!-- 无效详情地址处理 -->
  <div class="project-detail" v-else>
    <el-empty :description="`未找到编号为 ${id} 的项目`">
      <el-button type="primary" @click="goList">返回项目列表</el-button>
    </el-empty>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProjectsStore } from '../stores/projects'

const route = useRoute()
const router = useRouter()
const projectsStore = useProjectsStore()

// 使用 useRoute() 获取动态路由参数（字符串需转数字），Store getter getById 查找
const id = computed(() => Number(route.params.id))
const project = computed(() => projectsStore.getById(id.value))

const statusType = (s) => ({ '已完成': 'success', '开发中': 'warning', '规划中': 'info' }[s] || 'info')

// 编程式导航：go(-1) 返回上一页
const goBack = () => router.go(-1)
const goList = () => router.push({ name: 'project-list' })
</script>

<style scoped>
.project-detail { padding: 8px 0; }
.back { margin-bottom: 16px; }
.p-name { margin: 0; color: var(--el-text-color-primary); }
.none { color: var(--el-text-color-secondary); }
</style>
