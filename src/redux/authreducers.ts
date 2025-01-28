import { combineReducers } from "@reduxjs/toolkit";

import token from "./auth/token";
import login from "./auth/login";

export default combineReducers({
  access: token,
  auth: login,
});
