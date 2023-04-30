import { Reportreducer, Settingsreducer } from "./dropdownState";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  Reportreducer,
  Settingsreducer,
});

export default rootReducer;
