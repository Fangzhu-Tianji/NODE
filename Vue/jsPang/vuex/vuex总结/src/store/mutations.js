import * as types from './mutation-types'

const mutations = {
  [types.SET_PAGE_TYPE] (state, pageType) {
    state.pageType = pageType
  },
  [types.SET_DEMO_TYPE] (state, demoType) {
    state.demoType = demoType
  },
  [types.SET_ACTIONS_DEMO1] (state, actionsDemo1) {
    state.actionsDemo1 = actionsDemo1
  },
  [types.SET_ACTIONS_DEMO2] (state, actionsDemo2) {
    state.actionsDemo2 = actionsDemo2
  },
  [types.SET_ACTIONS_ADD] (state) {
    state.actionsAdd = state.actionsDemo1 + state.actionsDemo2
  }
}

export default mutations
