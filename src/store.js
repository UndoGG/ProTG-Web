import { createStore } from 'vuex'


export const store = createStore({
  state() {
    return {
      currentWindow: 'head-collide'
    }
  },
  mutations: {
    setCurrentWindow(state, window) {
      state.currentWindow = window
    }
  }
})

