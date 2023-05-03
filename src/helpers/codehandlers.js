const errorhandler = (error, setstate) => {
  if (error.code === "ERR_NETWORK") {
    setstate("Network Error");
  } else if ([401, 403, 404, 405, 409, 500].includes(error?.response?.status)) {
    setstate(error?.response?.data?.message);
  } else {
    setstate(error?.message);
  }

  return new Promise((resolve, reject) => {
    // console.clear();
    resolve();
  });
};

function validateOrder(
  action,
  entryPrice,
  takeProfit,
  stopLoss,
  setAlertMessage,
  setError
) {
  if (action === "Buy") {
    if (entryPrice >= takeProfit) {
      setAlertMessage("Entry price must be less than take profit");
      setError(true);
      return true;
    }
    if (entryPrice <= stopLoss) {
      setAlertMessage("Entry price must be greater than stop loss");
      setError(true);
      return true;
    }
  } else if (action === "Sell") {
    if (entryPrice <= takeProfit) {
      setAlertMessage("Entry price must be greater than take profit");
      setError(true);
      return true;
    }
    if (entryPrice >= stopLoss) {
      setAlertMessage("Entry price must be less than stop loss");
      setError(true);
      return true;
    }
  }
}

export { errorhandler, validateOrder };
