import { getUserId } from "../helpers/Auth";
import api from "./api";

const theuser = getUserId();

function apiErrorhandler(error) {
  if (
    error?.response?.data?.message &&
    [401, 403, 404, 405, 409, 500].includes(error?.response?.status)
  ) {
    throw new Error(error?.response?.data?.message);
  } else if (error.code === "ERR_NETWORK") {
    throw new Error("Network Error");
  } else {
    return error;
  }
}

export const getAccountUserDetails = async () => {
  try {
    const response = await api.get(`/account/${theuser}`);
    return response?.data;
  } catch (error) {
    console.log(error);
    apiErrorhandler(error);
  }
};

export const saveAccountUserDetails = async (data) => {
  try {
    const response = await api.post(`/account/save/${theuser}`, data);
    return response?.data;
  } catch (error) {
    console.log(error);
    apiErrorhandler(error);
  }
};

export const getDistinctTrades = async () => {
  try {
    const response = await api.get(`/trade/distinctsymbol/${theuser}`);
    return response?.data?.symbols;
  } catch (error) {
    console.log(error);
    apiErrorhandler(error);
  }
};

export const getSymbolNametoUpdate = async () => {
  try {
    const response = await api.get(`/trade/distinctsymbol/${theuser}`);
    return response?.data?.symbols;
  } catch (error) {
    console.log(error);
    apiErrorhandler(error);
  }
};

export const saveSymbolNametoUpdate = async (data) => {
  try {
    const response = await api.post(`/trade/nameupdate/${theuser}`, data);
    return response?.data?.message;
  } catch (error) {
    console.log(error);
    apiErrorhandler(error);
  }
};

export const addNewNote = async (tradeid, data) => {
  try {
    const response = await api.post(
      `/trade/notes/addnote/${tradeid}/${theuser}`,
      data
    );
    return response?.data;
  } catch (error) {
    console.log(error);
    apiErrorhandler(error);
  }
};

export const deleteoneNote = async (tradeid, data) => {
  try {
    const response = await api.post(
      `/trade/notes/deletenote/${tradeid}/${theuser}`,
      data
    );
    return response?.data;
  } catch (error) {
    console.log(error);
    apiErrorhandler(error);
  }
};

export const updateoneNote = async (tradeid, data) => {
  try {
    const response = await api.post(
      `/trade/notes/updatenote/${tradeid}/${theuser}`,
      data
    );
    return response?.data;
  } catch (error) {
    console.log(error);
    apiErrorhandler(error);
  }
};

export const getTrades = async () => {
  try {
    const response = await api.get(`/trade/showtrades/${theuser}`);
    return response?.data?.trades;
  } catch (error) {
    console.log(error);
    apiErrorhandler(error);
  }
};

export const editTradeapi = async (tradeid) => {
  try {
    const response = await api.get(`/trade/edit/${tradeid}/${theuser}`);
    return response?.data[0];
  } catch (error) {
    console.log(error);
    apiErrorhandler(error);
  }
};

export const updateTradeapi = async (tradeid, data) => {
  try {
    const response = await api.post(`/trade/update/${tradeid}`, data);
    return response?.data;
  } catch (error) {
    console.log(error);
    apiErrorhandler(error);
  }
};

export const deleteTrade = async (tradeid) => {
  try {
    const response = await api.get(`/trade/delete/${tradeid}`);
    return response?.data;
  } catch (error) {
    console.log(error);
    apiErrorhandler(error);
  }
};

// Reports routes

export const getReport = async () => {
  try {
    const response = await api.get(`/report/bytimeframe/${theuser}`);
    return response?.data;
  } catch (error) {
    console.log(error);
    apiErrorhandler(error);
  }
};

export const getReportSymbol = async () => {
  try {
    const response = await api.get(`/report/bysymbol/${theuser}`);
    return response?.data;
  } catch (error) {
    console.log(error);
    apiErrorhandler(error);
  }
};

export const getReportyearly = async () => {
  try {
    const response = await api.get(`/report/byyearly/${theuser}`);
    return response?.data;
  } catch (error) {
    console.log(error);
    apiErrorhandler(error);
  }
};

export const getReportmonthly = async () => {
  try {
    const response = await api.get(`/report/bymonthly/${theuser}`);
    return response?.data;
  } catch (error) {
    console.log(error);
    apiErrorhandler(error);
  }
};

export const getReportweekday = async () => {
  try {
    const response = await api.get(`/report/byweekday/${theuser}`);
    return response?.data;
  } catch (error) {
    console.log(error);
    apiErrorhandler(error);
  }
};

export const getReportvolume = async () => {
  try {
    const response = await api.get(`/report/byvolume/${theuser}`);
    return response?.data;
  } catch (error) {
    console.log(error);
    apiErrorhandler(error);
  }
};

export const getReporthourly = async () => {
  try {
    const response = await api.get(`/report/byhourly/${theuser}`);
    return response?.data;
  } catch (error) {
    console.log(error);
    apiErrorhandler(error);
  }
};

export const getCalenderReport = async () => {
  try {
    const response = await api.get(`/report/calendar/${theuser}`);
    return response?.data;
  } catch (error) {
    console.log(error);
    apiErrorhandler(error);
  }
};

/* strategy endpoints */

export const newStrategy = async (data) => {
  try {
    const response = await api.post(`/strategy/new/${theuser}`, data);
    return response?.data;
  } catch (error) {
    console.log(error);
    apiErrorhandler(error);
  }
};
