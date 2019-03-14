import { ADD, SUBSTRACT } from "../actions/types";

const initialState = {
  counter: 0
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD:
      return { ...state, counter: state.counter + 1 };
    case SUBSTRACT:
      return { ...state, counter: state.counter - 1 };
    default:
      return state;
  }
}
