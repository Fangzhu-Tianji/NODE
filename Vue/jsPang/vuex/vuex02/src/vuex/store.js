import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    countter: 32
}
const mutations = {
    add (state, n) {
        state.countter+=n;
    },//传参
    reduce (state) {
        state.countter--;
    }
}
const getters = {
    countter (state) {
        return state.countter+=30;
    }
}

export default new Vuex.Store({
    state,
    mutations,
    getters
})