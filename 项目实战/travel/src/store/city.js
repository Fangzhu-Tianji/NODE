// 参考技术胖，需要在每个上面注入store
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  cityDemo: '新疆'
}

const mutations = {
  changeCity (state) {
    console.log(state)
  }
}

export default new Vuex.Store({
  state,
  mutations
})
