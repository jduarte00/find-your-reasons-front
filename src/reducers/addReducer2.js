import { ADD2, SUBSTRACT2 } from "../actions/types";

const initialState = {
  contador: 1000
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD2:
      return { ...state, contador: state.contador + 1 };
    case SUBSTRACT2:
      return { ...state, contador: state.contador - 1 };
    default:
      console.log("nadita");
      return state;
  }
}
