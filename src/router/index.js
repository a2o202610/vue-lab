import { createRouter, createWebHashHistory } from 'vue-router'
// 注意：user store 只能在守卫函数内部调用（此时 Pinia 已初始化），不能在模块顶层调用
import { useUserStore } from '../stores/user'

// 路由表：基础路由 + 动态路由 + 嵌套路由 + 通配符404
const routes = [
  // 根路径重定向到首页
  { path: '/', redirect: '/home' },

  // 首页（命名路由 + meta 标题）
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: { title: '个人主页' }
  },

  // 文章列表（公开页面，数据来自文章 Store）
  {
    path: '/article',
    name: 'article',
    component: () => import('../views/ArticleListView.vue'),
    meta: { title: '文章列表' }
  },

  // 关于页
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    meta: { title: '关于我' }
  },

  // 项目中心：嵌套路由父级
  {
    path: '/project',
    name: 'project',
    component: () => import('../views/ProjectLayoutView.vue'),
    meta: { title: '项目中心' },
    children: [
      // 空子路径直接渲染列表组件
      {
        path: '',
        name: 'project-list',
        component: () => import('../views/ProjectListView.vue'),
        meta: { title: '项目列表' }
      },
      // /project/list 重定向到列表
      { path: 'list', redirect: { name: 'project-list' } },
      // 项目详情：动态路由参数 :id
      {
        path: ':id',
        name: 'project-detail',
        component: () => import('../views/ProjectDetailView.vue'),
        meta: { title: '项目详情' }
      }
    ]
  },

  // 登录页
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
    meta: { title: '登录' }
  },

  // 后台管理：嵌套路由父级 + meta 权限标识
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/AdminLayoutView.vue'),
    meta: { title: '后台管理', requireAuth: true },
    children: [
      { path: '', redirect: '/admin/profile' },
      {
        path: 'profile',
        name: 'admin-profile',
        component: () => import('../views/AdminProfileEdit.vue'),
        meta: { title: '编辑个人简介', requireAuth: true }
      },
      {
        path: 'project',
        name: 'admin-project',
        component: () => import('../views/AdminProjectEdit.vue'),
        meta: { title: '编辑项目信息', requireAuth: true }
      },
      {
        path: 'article',
        name: 'admin-article',
        component: () => import('../views/ArticleManageView.vue'),
        meta: { title: '文章管理', requireAuth: true }
      }
    ]
  },

  // 404 通配符路由（必须放在最后）
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFoundView.vue'),
    meta: { title: '页面未找到' }
  }
]

const router = createRouter({
  // hash 模式：适配 GitHub Pages（刷新子路由不会404）
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

// ========== 全局前置守卫 ==========
router.beforeEach((to, from, next) => {
  // 在守卫内部调用 useUserStore，确保 Pinia 已完成初始化
  const userStore = useUserStore()

  // 1. 更新浏览器标题（使用 meta.title）
  if (to.meta.title) {
    document.title = to.meta.title + ' · 个人主页'
  }

  // 2. 路由守卫：需要登录但未登录 → 跳转登录页（登录状态来自用户 Store）
  if (to.meta.requireAuth && !userStore.isLoggedIn) {
    next({ name: 'login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

export default router
