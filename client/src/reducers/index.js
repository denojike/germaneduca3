import { combineReducers } from "redux";
import auth from "./auth";
import profile from "./profile";
import study from "./study";

export default combineReducers({
  auth,
  profile,
  study
});
