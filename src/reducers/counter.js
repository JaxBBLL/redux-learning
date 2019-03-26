import { ADD, MINUS } from "../constants";

const INITIAL_STATE = {
  num: 0
};

export default function todos(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        num: state.num + 1
      };
    case MINUS:
      return {
        ...state,
        num: state.num - 1
      };
    default:
      return state;
  }
}
