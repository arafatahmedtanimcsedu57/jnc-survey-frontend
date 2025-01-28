import { combineReducers } from "@reduxjs/toolkit";
import formBuilderEntity from "./entities/formBuilderEntity";
import clientEntity from "./entities/clientsEntity";

export default combineReducers({
  formBuilder: formBuilderEntity,
  client: clientEntity,
});
