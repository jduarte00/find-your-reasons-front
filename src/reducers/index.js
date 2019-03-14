import { combineReducers } from "redux";
import addReducer from "./addReducer";
import secondAddReducer from "./addReducer2";
export default combineReducers({
  number: addReducer,
  secondNumber: secondAddReducer
});
