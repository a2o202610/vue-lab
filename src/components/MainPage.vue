<template>
  <div class="main-page">
    <!-- 个人信息卡片：el-avatar 头像组件 -->
    <el-card shadow="hover">
      <div class="profile-top">
        <el-avatar :size="90" :src="info.avatar" />
        <div class="profile-text">
          <h3>{{ info.name }}</h3>
          <p>{{ info.className }}</p>
          <el-button size="small" type="primary" plain @click="goEdit">编辑个人信息</el-button>
        </div>
      </div>

      <el-divider content-position="left">个人简介</el-divider>
      <p class="desc">{{ info.desc }}</p>

      <!-- 搜索框 el-input v-model 双向绑定（实验一原有功能保留） -->
      <el-divider content-position="left">搜索技能（共 {{ profileStore.skillCount }} 项）</el-divider>
      <el-input v-model="searchKey" placeholder="输入关键词搜索" clearable style="max-width:280px" />

      <!-- computed 计算属性筛选 + el-tag 标签组件渲染 -->
      <div class="skill-tags">
        <el-tag
          v-for="s in filterSkill"
          :key="s"
          closable
          @close="profileStore.removeSkill(profileStore.skillList.indexOf(s))"
        >{{ s }}</el-tag>
        <el-tag v-if="filterSkill.length === 0" type="info">无匹配技能</el-tag>
      </div>
    </el-card>

    <!-- ★ 实验四新增：el-timeline 时间线组件展示个人经历 -->
    <el-card shadow="hover" class="timeline-card">
      <template #header><b>个人经历时间线</b></template>
      <el-timeline>
        <el-timeline-item
          v-for="(item, i) in profileStore.timeline"
          :key="i"
          :timestamp="item.date"
          :type="i === profileStore.timeline.length - 1 ? 'success' : ''"
          placement="top"
        >
          <h4>{{ item.title }}</h4>
          <p>{{ item.content }}</p>
        </el-timeline-item>
      </el-timeline>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useProfileStore } from '../stores/profile'

const router = useRouter()
// storeToRefs 解构 Store 的 state，保持响应式（actions 直接从实例调用）
const profileStore = useProfileStore()
const { info, skillList } = storeToRefs(profileStore)

// 组件内部状态（原实验一data）
const searchKey = ref('')

// computed 计算属性：技能筛选（实验一核心逻辑保留）
const filterSkill = computed(() => {
  if (!searchKey.value) return skillList.value
  return skillList.value.filter(item => item.includes(searchKey.value))
})

// watch 侦听搜索关键词变化
watch(searchKey, (newVal) => {
  console.log('搜索键发生变化：', newVal)
})

// mounted生命周期钩子
onMounted(() => {
  console.log('Vue页面已经加载完成！')
})

// 编程式导航：跳转到后台编辑简介
const goEdit = () => {
  router.push({ name: 'admin-profile' })
}
</script>

<style scoped>
.main-page { padding: 24px; max-width: 800px; margin: 0 auto; width: 100%; display: flex; flex-direction: column; gap: 20px; }
.profile-top { display: flex; align-items: center; gap: 20px; }
.profile-text h3 { margin-bottom: 6px; color: var(--el-text-color-primary); }
.profile-text p { color: var(--el-text-color-secondary); margin-bottom: 10px; }
.desc { color: var(--el-text-color-regular); }
.skill-tags { margin-top: 14px; display: flex; gap: 10px; flex-wrap: wrap; }
.timeline-card h4 { margin: 0 0 4px; color: var(--el-text-color-primary); }
.timeline-card p { color: var(--el-text-color-secondary); margin: 0; }
</style>
