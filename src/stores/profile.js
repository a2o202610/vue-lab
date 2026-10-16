import { defineStore } from 'pinia'

// ========== 个人信息 Store：基本信息 + 技能列表 + 时间线，localStorage 持久化 ==========
const INFO_KEY = 'profile_info'
const SKILL_KEY = 'profile_skills'
const TIMELINE_KEY = 'profile_timeline'

// 默认数据（首次访问时使用）
const defaultInfo = {
  name: '孙敏洁+249980832',
  className: '24计科2班',
  desc: '喜欢前端开发，爱好编程学习',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SunMinjie'
}
const defaultSkills = ['Vue', 'HTML', 'CSS', 'JavaScript', 'Python', 'MySQL']
const defaultTimeline = [
  { date: '2024-09', title: '入学', content: '进入24计科2班，开始大学学习生活' },
  { date: '2025-03', title: '接触前端', content: '学习 HTML / CSS / JavaScript 基础' },
  { date: '2025-09', title: '学习 Vue', content: '掌握 Vue3 组件化开发，完成简易计算器项目' },
  { date: '2026-06', title: '全栈探索', content: '学习 Node.js 与 MySQL 数据库' },
  { date: '2026-10', title: '项目实战', content: '完成个人主页项目，学习 Pinia 状态管理与 Element Plus' }
]

// 从 localStorage 读取，读取失败时返回默认值
function load(key, fallback) {
  try {
    const saved = JSON.parse(localStorage.getItem(key))
    return saved !== null ? saved : fallback
  } catch {
    return fallback
  }
}

export const useProfileStore = defineStore('profile', {
  state: () => ({
    info: load(INFO_KEY, defaultInfo),
    skillList: load(SKILL_KEY, defaultSkills),
    timeline: load(TIMELINE_KEY, defaultTimeline)
  }),

  getters: {
    // 派生值：一句话简介
    intro: (state) => `${state.info.name} · ${state.info.className}`,
    skillCount: (state) => state.skillList.length
  },

  actions: {
    updateInfo(newInfo) {
      Object.assign(this.info, newInfo)
      localStorage.setItem(INFO_KEY, JSON.stringify(this.info))
    },
    addSkill(skill) {
      if (skill && !this.skillList.includes(skill)) {
        this.skillList.push(skill)
        localStorage.setItem(SKILL_KEY, JSON.stringify(this.skillList))
      }
    },
    removeSkill(index) {
      this.skillList.splice(index, 1)
      localStorage.setItem(SKILL_KEY, JSON.stringify(this.skillList))
    }
  }
})
