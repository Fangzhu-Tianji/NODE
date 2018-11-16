import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  city: '杭州'
}

const mutations = {
  changeCity (state, n) {
    state.city = n
  }
}

export default new Vuex.Store({
  state,
  mutations
})
