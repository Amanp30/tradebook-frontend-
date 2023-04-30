import { Reportreducer, Settingsreducer } from "./dropdownState";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  Settingsreducer,
  Reportreducer,
});

export default rootReducer;
