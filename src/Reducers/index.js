import { Reportreducer, Settingsreducer } from "./dropdownState";
import { combineReducers } from "redux";
import { Previousurls } from "./previousUrls";

const rootReducer = combineReducers({
  Settingsreducer,
  Reportreducer,
  Previousurls,
});

export default rootReducer;
