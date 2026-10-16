import { defineStore } from 'pinia'

// ========== 文章 Store：文章增删改查 + getters + localStorage 持久化 ==========
const ARTICLE_KEY = 'articles_data'

const defaultArticles = [
  { id: 1, title: 'Vue3 组件化开发笔记', category: '前端', date: '2026-09-20', summary: '记录 defineProps、defineEmits 与三种插槽的使用心得' },
  { id: 2, title: 'Vue Router 路由配置指南', category: '前端', date: '2026-10-08', summary: '动态路由、嵌套路由与导航守卫的实践总结' },
  { id: 3, title: 'Pinia 状态管理入门', category: '学习', date: '2026-10-15', summary: 'state/getters/actions 三大核心概念与 localStorage 持久化方案' }
]

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(ARTICLE_KEY))
    return Array.isArray(saved) ? saved : defaultArticles
  } catch {
    return defaultArticles
  }
}

export const useArticlesStore = defineStore('articles', {
  state: () => ({
    articles: load()
  }),

  getters: {
    articleCount: (state) => state.articles.length,
    // 按日期倒序排列（新的在前）
    sortedArticles: (state) =>
      [...state.articles].sort((a, b) => b.date.localeCompare(a.date)),
    // 所有分类（去重）
    categories: (state) => [...new Set(state.articles.map(a => a.category))]
  },

  actions: {
    save() {
      localStorage.setItem(ARTICLE_KEY, JSON.stringify(this.articles))
    },
    addArticle(data) {
      const newId = this.articles.length > 0
        ? Math.max(...this.articles.map(a => a.id)) + 1
        : 1
      this.articles.push({ id: newId, ...data })
      this.save()
    },
    updateArticle(id, data) {
      const idx = this.articles.findIndex(a => a.id === id)
      if (idx !== -1) {
        Object.assign(this.articles[idx], data)
        this.save()
      }
    },
    removeArticle(id) {
      this.articles = this.articles.filter(a => a.id !== id)
      this.save()
    }
  }
})
