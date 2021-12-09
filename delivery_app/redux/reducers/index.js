import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import userInfoReducer from "./userInfoReducer";

let reducers = combineReducers({
  cartReducer: cartReducer,
  userInfoReducer:userInfoReducer
});

const rootReducer = (state, action) => {
  return reducers(state, action);
};

export default rootReducer;
