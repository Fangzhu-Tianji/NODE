import * as types from './mutation-types'

export const selectObj = function ({commit, state}, {add1, add2}) {
  commit(types.SET_ACTIONS_DEMO1, add1)
  commit(types.SET_ACTIONS_DEMO2, add2)
  setTimeout(function () {
    commit(types.SET_ACTIONS_ADD)
  }, 5000)
}
