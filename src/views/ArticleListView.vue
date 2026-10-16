<template>
  <div class="article-list">
    <h2>文章列表</h2>
    <p class="sub">共 {{ articleStore.articleCount }} 篇文章（按日期倒序，数据来自 Pinia Store）</p>

    <el-empty v-if="articleStore.articleCount === 0" description="还没有文章，去后台发布一篇吧" />

    <el-row :gutter="20">
      <el-col v-for="a in articleStore.sortedArticles" :key="a.id" :span="8">
        <el-card shadow="hover" class="article-card">
          <template #header>
            <div class="card-head">
              <span class="title">{{ a.title }}</span>
              <el-tag size="small" type="success">{{ a.category }}</el-tag>
            </div>
          </template>
          <p class="summary">{{ a.summary }}</p>
          <div class="date">
            <el-tag size="small" type="info" effect="plain">{{ a.date }}</el-tag>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
// 跨页面共享：文章数据直接从 Pinia Store 读取
import { useArticlesStore } from '../stores/articles'

const articleStore = useArticlesStore()
// getters 通过 Store 实例直接访问，具有缓存特性
// 注意：不解构则无需 storeToRefs；本页直接以 articleStore.xxx 方式访问
</script>

<style scoped>
.article-list { padding: 24px; max-width: 1100px; margin: 0 auto; width: 100%; }
.article-list h2 { text-align: center; color: #2c3e50; }
.sub { text-align: center; color: #909399; margin-bottom: 24px; }
.article-card { margin-bottom: 20px; }
.card-head { display: flex; justify-content: space-between; align-items: center; gap: 8px; }
.title { font-weight: bold; }
.summary { color: #606266; min-height: 44px; }
.date { margin-top: 8px; }
</style>
