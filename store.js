import { createStore } from './redux.js';
import * as types from './types.js';
import initState from './state.js'

// state是一个状态树，可以是任意的结构
// action是一个纯对象 {type: 'INCREASE'}
let reducer = (state, action) => {
  state = state || initState
  if (action === undefined) {
    return state;
  }
  switch (action.type) {
    case types.INCREASE:
      return {
        number: state.number + 1
      }
    case types.DECREASE:
      return {
        number: state.number - 1
      }
    default:
      return state;
  }

}

let store = createStore(reducer);

export default store;
