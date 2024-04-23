import { createStore } from 'vuex'


export const store = createStore({
  state() {
    return {
      currentWindow: 'head-collide',
      userInfo: null
    }
  },
  mutations: {
    setCurrentWindow(state, window) {
      state.currentWindow = window
    },
    setUserInfo(state, info) {
      state.userInfo = info
    }
  }
})

