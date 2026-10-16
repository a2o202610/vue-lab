<template>
  <div class="project-page">
    <h2 class="page-title">我的项目展示</h2>

    <section class="section">
      <h3>▎我的项目</h3>
      <div class="card-grid">
        <ProjectCard
          v-for="(p, i) in projectList"
          :key="p.id"
          :project="p"
          :index="i"
        />
      </div>
    </section>

    <section class="section">
      <h3>▎项目列表</h3>
      <div class="card-grid">
        <ProjectCard
          v-for="(p, i) in projectList"
          :key="'custom-' + p.id"
          :project="p"
          :index="i"
        >
          <template #header>
            <h3>🔥 {{ p.name }}</h3>
          </template>

          <p>项目简介：{{ p.desc }}</p>
          <p class="idx">编号 #{{ i + 1 }}</p>

          <template #tags="{ item }">
            <span class="badge status">{{ item.status }}</span>
            <span class="badge id">ID: {{ item.id }}</span>
          </template>

          <template #actions>
            <button class="btn-info">详情</button>
            <button class="btn-github">源码</button>
          </template>
        </ProjectCard>
      </div>
    </section>

    <section class="section">
      <h3>▎项目详情</h3>
      <div class="card-grid">
        <ProjectCard
          v-for="(p, i) in projectList"
          :key="'scoped-' + p.id"
          :project="p"
          :index="i"
        >
          <template #header>
            <h3>📦 {{ p.name }}</h3>
          </template>

          <p>当前遍历到的是 <b>第 {{ i + 1 }} 个</b> 项目</p>
          <p>项目详情：{{ p.desc }}</p>

          <template #tags="{ item, index }">
            <span class="badge status">{{ item.status }}</span>
            <span class="badge idx">序号 {{ index }}</span>
            <span class="badge data">作用域插槽数据可用</span>
          </template>

          <template #actions="{ item }">
            <button class="btn-run" @click="runProject(item)">▶ 运行</button>
          </template>
        </ProjectCard>
      </div>
    </section>
  </div>
</template>

<script setup>
import ProjectCard from './ProjectCard.vue'

defineProps({
  projectList: {
    type: Array,
    required: true
  }
})

const runProject = (item) => {
  alert(`运行项目：${item.name}`)
}
</script>

<style scoped>
.project-page {
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
}
.page-title {
  text-align: center;
  margin-bottom: 28px;
  color: #2c3e50;
  font-size: 1.8rem;
}
.section {
  margin-bottom: 40px;
}
.section h3 {
  margin-bottom: 16px;
  color: #34495e;
  font-size: 1.1rem;
  border-left: 4px solid #27ae60;
  padding-left: 10px;
}
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}
.idx {
  color: #95a5a6;
  font-size: 0.9rem;
}
.badge {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.8rem;
  background: #ecf0f1;
  color: #7f8c8d;
}
.badge.status { background: #d5f5e3; color: #1e8449; }
.badge.id    { background: #d6eaf8; color: #2471a3; }
.badge.idx   { background: #fdebd0; color: #d68910; }
.badge.data  { background: #e8daef; color: #7d3c98; }

.btn-info, .btn-github, .btn-run {
  padding: 6px 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
}
.btn-info  { background: #3498db; color: white; }
.btn-github{ background: #2c3e50; color: white; }
.btn-run   { background: #e74c3c; color: white; }
.btn-info:hover  { background: #2980b9; }
.btn-github:hover{ background: #1a252f; }
.btn-run:hover   { background: #c0392b; }
</style>
