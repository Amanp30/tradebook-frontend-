export const handleReportDropdown = (payload) => {
  return { type: "HANDLE_REPORT_NAV_DROPDOWN", payload: payload };
};

export const handleSettingsDropdown = (payload) => {
  return { type: "HANDLE_SETTING_NAV_DROPDOWN", payload: payload };
};

export const addUrlTostate = (payload) => {
  return { type: "ADD_URL_TO_STATE", payload: payload };
};
