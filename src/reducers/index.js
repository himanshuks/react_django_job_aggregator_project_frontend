import { combineReducers } from "redux";
import auth from "./authReducer";
import errors from "./errorReducer";
import messages from "./messageReducer";
import contractReducer from "./contractReducer";
import tenderReducer from "./tenderReducer";
import plansReducers from "./plansReducers";
import paymentReducers from "./paymentReducers";
import socialReducer from "./socialReducer";

export default combineReducers({
  auth,
  errors,
  messages,
  contractReducer,
  tenderReducer,
  socialReducer,
  plansReducers,
  paymentReducers
});
