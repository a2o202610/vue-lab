import { defineStore } from 'pinia'

// ========== 项目 Store：项目信息增删改查 + localStorage 持久化 ==========
const PROJECT_KEY = 'projects_data'

const defaultProjects = [
  { id: 1, name: '在线笔记', desc: '简易笔记工具，支持Markdown编辑', status: '已完成', tech: ['Vue', 'LocalStorage'] },
  { id: 2, name: '待办清单', desc: '任务管理小应用，支持优先级排序', status: '开发中', tech: ['Vue', 'Pinia'] },
  { id: 3, name: '相册Demo', desc: '图片预览页面，支持懒加载', status: '规划中', tech: ['Vue', 'CSS Grid'] }
]

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(PROJECT_KEY))
    return Array.isArray(saved) ? saved : defaultProjects
  } catch {
    return defaultProjects
  }
}

export const useProjectsStore = defineStore('projects', {
  state: () => ({
    projects: load()
  }),

  getters: {
    projectCount: (state) => state.projects.length,
    // 已完成项目数
    doneCount: (state) => state.projects.filter(p => p.status === '已完成').length,
    // 按 id 查找项目（供详情页使用）
    getById: (state) => (id) => state.projects.find(p => p.id === id)
  },

  actions: {
    save() {
      localStorage.setItem(PROJECT_KEY, JSON.stringify(this.projects))
    },
    addProject(data) {
      const newId = this.projects.length > 0
        ? Math.max(...this.projects.map(p => p.id)) + 1
        : 1
      this.projects.push({ id: newId, status: '规划中', tech: [], ...data })
      this.save()
    },
    updateProject(id, data) {
      const idx = this.projects.findIndex(p => p.id === id)
      if (idx !== -1) {
        Object.assign(this.projects[idx], data)
        this.save()
      }
    },
    removeProject(id) {
      this.projects = this.projects.filter(p => p.id !== id)
      this.save()
    }
  }
})
