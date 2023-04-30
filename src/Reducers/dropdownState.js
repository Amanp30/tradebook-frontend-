var initialstate = "default";

export const Reportreducer = (state = initialstate, action) => {
  switch (action.type) {
    case "HANDLE_REPORT_NAV_DROPDOWN":
      return action.payload;
    default:
      return state;
  }
};

export const Settingsreducer = (state = initialstate, action) => {
  switch (action.type) {
    case "HANDLE_SETTING_NAV_DROPDOWN":
      return action.payload;
    default:
      return state;
  }
};
