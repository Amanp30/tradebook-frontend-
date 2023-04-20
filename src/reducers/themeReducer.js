import { getCookie } from "../helpers/Auth";
const themeReducer = (
  state = { theme: getCookie("theme") === "dark" ? false : true },
  action
) => {
  switch (action.type) {
    case "TOGGLE_THEME":
      return { ...state, theme: !state.theme };
    default:
      return state;
  }
};

export default themeReducer;
