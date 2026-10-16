import { defineStore } from 'pinia'

// ========== 用户 Store：登录状态 + localStorage 持久化 ==========
const LOGIN_KEY = 'user_login'
const NAME_KEY = 'user_name'

export const useUserStore = defineStore('user', {
  // state：页面刷新时从 localStorage 读取已保存的登录状态
  state: () => ({
    isLoggedIn: JSON.parse(localStorage.getItem(LOGIN_KEY)) || false,
    username: localStorage.getItem(NAME_KEY) || ''
  }),

  // getters：基于 state 派生计算值，具有缓存特性
  getters: {
    welcomeMsg: (state) =>
      state.isLoggedIn ? `欢迎回来，${state.username}` : '游客模式，请先登录'
  },

  // actions：修改 state 的唯一推荐入口，修改后同步写入 localStorage
  actions: {
    login(username, password) {
      // 模拟登录校验
      if (username === 'admin' && password === '123456') {
        this.isLoggedIn = true
        this.username = username
        localStorage.setItem(LOGIN_KEY, 'true')
        localStorage.setItem(NAME_KEY, username)
        return true
      }
      return false
    },
    logout() {
      this.isLoggedIn = false
      this.username = ''
      localStorage.removeItem(LOGIN_KEY)
      localStorage.removeItem(NAME_KEY)
    }
  }
})
