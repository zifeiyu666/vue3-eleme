import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store =  {
  state: {
    historyList: []
  },
  mutations: {
    saveHistory(state, history) {
      console.log(1111111)
      console.log(history)
      let list = state.historyList
      let canAdd = true
      list.forEach(item => {
        if(item.geohash === history.geohash) {
          canAdd = false
        }
      })
      if (canAdd) {
        state.historyList.push(history)
      }
    },
    clearHistory(state) {
      state.historyList = []
    }
  }
}

export default new Vuex.Store(store)

