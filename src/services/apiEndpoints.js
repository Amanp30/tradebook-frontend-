import api from "./api";

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

export const getTrades = async () => {
  try {
    const response = await api.get("/trade/showtrades");
    return response?.data?.trades;
  } catch (error) {
    console.log(error);
    apiErrorhandler(error);
  }
};

export const editTradeapi = async (tradeid) => {
  try {
    const response = await api.get(`/trade/edit/${tradeid}`);
    return response?.data;
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
